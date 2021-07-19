#include <WiFi.h>
#include <PubSubClient.h>

// WIFI Credentials
const char *ssid = "Castano";
const char *pswd = "grezzo57";

// Add your MQTT Broker IP address
const char *mqtt_server = "192.168.1.157"; // IP address of my RPi
const int mqtt_port = 1883;                // Listener port on my RPi

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

float temperature = 0;
float humidity = 0;

// Led Pin
const int ledPin = 2;

void setup()
{
    Serial.begin(115200);

    setup_wifi();
    client.setServer(mqtt_server, mqtt_port); // port where will be listened the messages
    client.setCallback(callback);

    pinMode(ledPin, OUTPUT);
}

void setup_wifi()
{
    delay(10);
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, pswd);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *message, unsigned int length)
{
    Serial.print("Message arrived on topic: ");
    Serial.print(topic);
    Serial.print(". Message: ");
    String messageTemp;

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)message[i]);
        messageTemp += (char)message[i];
    }
    Serial.println();

    // Feel free to add more if statements to control more GPIOs with MQTT

    // If a message is received on the topic esp32/output, you check if the message is either "on" or "off".
    // Changes the output state according to the message
    if (String(topic) == "esp32/output")
    {
        Serial.print("Changing output to ");
        if (messageTemp == "on")
        {
            Serial.println("on");
            digitalWrite(ledPin, HIGH);
        }
        else if (messageTemp == "off")
        {
            Serial.println("off");
            digitalWrite(ledPin, LOW);
        }
    }
}

void reconnect()
{
    // Loop until we're reconnected
    while (!client.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Attempt to connect
        if (client.connect("ESP8266Client"))
        {
            Serial.println("connected");
            // Subscribe
            client.subscribe("esp32/output");
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 5 seconds");
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}

void loop()
{
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();

    long now = millis();
    if (now - lastMsg > 10000)
    {
        lastMsg = now;

        temperature = 25 + millis() / 1000;
        humidity = 100 + millis() / 1000;

        char tempString[8];
        char humString[8];
        dtostrf(temperature, 1, 2, tempString);
        dtostrf(humidity, 1, 2, humString);

        Serial.print("Temperature: ");
        Serial.print(tempString);
        Serial.print(", Humidity: ");
        Serial.println(humString);

        client.publish("esp32/temperature", tempString);
        client.publish("esp32/humidity", humString);
    }
}