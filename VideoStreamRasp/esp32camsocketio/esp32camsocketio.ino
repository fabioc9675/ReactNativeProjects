// Repository Example: https://github.com/Inglebard/esp32cam-relay

/* ********************************************************
 * **** INCLUDE FILES *************************************
 * ********************************************************/
#include "WiFi.h"
#include "esp_camera.h"

#include "SocketIOclientMod.hpp"
#include <ArduinoJson.h>

#include <base64.h>

/* ********************************************************
 * **** DEFINES *******************************************
 * ********************************************************/
// Pin definition for CAMERA_MODEL_AI_THINKER
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27

#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

#define USE_SERIAL Serial

/* ********************************************************
 * **** CONSTANTS *****************************************
 * ********************************************************/
// Network credentials
const char *hostname = "ESP32CAM";
const char *ssid = "CLARO_WIFI93";
const char *password = "Grezzo57";

/* ********************************************************
 * **** VARIABLES *****************************************
 * ********************************************************/
unsigned long messageTimestamp = 0;

SocketIOclientMod socketIO;

/* ********************************************************
 * **** FUNCTIONS *****************************************
 * ********************************************************/
void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
    case sIOtype_DISCONNECT:
        USE_SERIAL.printf("[IOc] Disconnected!\n");
        break;
    case sIOtype_CONNECT:
        USE_SERIAL.printf("[IOc] Connected to url: %s\n", payload);

        // join default namespace (no auto join in Socket.IO V3)
        socketIO.send(sIOtype_CONNECT, "/");
        break;
    case sIOtype_EVENT:
        USE_SERIAL.printf("[IOc] get event: %s\n", payload);
        break;
    case sIOtype_ACK:
        USE_SERIAL.printf("[IOc] get ack: %u\n", length);
        break;
    case sIOtype_ERROR:
        USE_SERIAL.printf("[IOc] get error: %u\n", length);
        break;
    case sIOtype_BINARY_EVENT:
        USE_SERIAL.printf("[IOc] get binary: %u\n", length);
        break;
    case sIOtype_BINARY_ACK:
        USE_SERIAL.printf("[IOc] get binary ack: %u\n", length);
        break;
    }
}

void setupCamera()
{
    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG;

    config.frame_size = FRAMESIZE_VGA; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
    config.jpeg_quality = 10;
    config.fb_count = 1;

    // Init Camera
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK)
    {
        Serial.printf("Camera init failed with error 0x%x", err);
        return;
    }
}

/* ********************************************************
 * **** MAIN FUNCTION *************************************
 * ********************************************************/
void setup()
{
    Serial.begin(115200);

    Serial.println("Program begin...");

    // Connect to the WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(1000);
        Serial.println("Connecting to WiFi..");
    }

    // Print ESP32 Local IP Address
    Serial.println(WiFi.localIP());

    // Setup camera
    setupCamera();

    // server address, port and URL
    socketIO.begin("greenhouse-vid.herokuapp.com", 80, "/socket.io/?EIO=4"); // without https://
    // socketIO.begin("192.168.20.3", 5000, "/socket.io/?EIO=4");

    // event handler
    socketIO.onEvent(socketIOEvent);

    // try ever 5000 again if connection has failed
    // socketIO.setReconnectInterval(5000);
}

void loop()
{
    socketIO.loop();

    uint64_t now = millis();

    // sample frame
    if (now - messageTimestamp > 500)
    {
        messageTimestamp = now;

        Serial.println("Taking photo");

        // Taking Photo
        camera_fb_t *fb = NULL;
        fb = esp_camera_fb_get();
        if (!fb)
        {
            Serial.println("Camera capture failed");
            return;
        }

        // Serial.print("Buffer = ");
        // Serial.println(fb->buf);

        Serial.print("Size = ");
        Serial.println(fb->len);

        Serial.print("Format = ");
        Serial.println(fb->format);

        Serial.print("Height = ");
        Serial.println(fb->height);

        Serial.print("Width = ");
        Serial.println(fb->width);

        // Serial.print("Timestamp = ");
        // Serial.println(fb->timestamp);

        // String toEncode = "Hello World";
        String encoded = "data:image/jpg;base64," + base64::encode(fb->buf, fb->len);

        // creat JSON message for Socket.IO (event)
        DynamicJsonDocument doc(65535);
        JsonArray array = doc.to<JsonArray>();

        // add evnet name
        // Hint: socket.on('event_name', ....
        array.add("stream");
        array.add(encoded);

        // add payload (parameters) for the event
        // JsonObject param1 = array..createNestedObject();
        // param1["stream"] = encoded;

        // JSON to String (serializion)
        String output;
        serializeJson(doc, output);

        // Send event
        socketIO.sendEVENT(output);
        // socketIO.sendBIN(fb->buf, fb->len);

        // Print JSON for debugging
        // USE_SERIAL.println(output);

        // Serial.println(encoded);

        // socketIO.sendBIN(fb->buf, fb->len);
        Serial.println("Image sent");

        esp_camera_fb_return(fb);
    }
}