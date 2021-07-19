# Raspberry Pi, ESP32 and MQTT connection

## Installing MQTT Mosquitto on RPi

In terminal execute `sudo apt-get install mosquitto mosquitto-clients` to install the package. Also edit `sudo nano /etc/mosquitto/mosquitto.conf` and in the end of file add `listener 1883` 1883 represents just the port of the listener.

To initiate Mosquitto Service in RPi use the command `mosquitto_sub -v -t 'esp32/temperature' -t 'esp32/humidity' -t 'esp32/output'`

To write messages from RPi use `mosquitto_pub -m 'on' -t 'esp32/output'` or `mosquitto_pub -h localhost -m 'on' -t 'esp32/output'`


## ESP32 MQTT Client

Link: https://randomnerdtutorials.com/esp32-mqtt-publish-subscribe-arduino-ide/

download the package `PubSubClient`

