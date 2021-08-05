#!/usr/bin/env python 1
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
import sys
import mysql.connector
from mysql.connector import Error

# Abrir coneccion con base de datos
try:
    db = mysql.connector.connect(host='192.168.1.157',
                                 database='TEST_MQTT',
                                 user='root',
                                 password='root')

    if db.is_connected():
        db_Info = db.get_server_info()
        print("Connected to MySQL Server version ", db_Info)
        cursor = db.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)

except Error as e:
    print("Error while connecting to MySQL", e)
    print("No se pudo conectar con la base de datos")
    print("Cerrando...")
    sys.exit()

# Preparando cursor
cursor = db.cursor()

# The callback for when the client receiver a CONNACK response from the server.


def on_connect(client, userdata, flags, rc):
    print("Conectado -Codigo de resultado: ", str(rc))

    # Subscribing in on_connect() means that if we lose the connection

    # reconnect then subscriptions will be renewed.
    client.subscribe("#")

# The callback for when a PUBLISH message is received from the server.


def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    lista = msg.topic.split("/")

    sql = """INSERT INTO `MQTT_DATOS`(`USUARIO`, `TOPIC`, `DATO`) VALUES (\"""" + \
        lista[0] + """\", \"""" + lista[1] + \
        """\", \"""" + str(msg.payload) + """\");"""
    print(sql)

    try:
        # ejecutar un comando SQL
        cursor.execute(sql)
        db.commit()
        print("Guardando en base de datos...OK")
    except:
        db.rollback()
        print("Guardando en base de datos...Fallo")


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect("192.168.1.157", 1883, 60)
except:
    print("No se pudo conectar con el MQTT Broker...")
    print("Cerrando...")
    db.close()
    sys.exit()

try:
    client.loop_forever()
except KeyboardInterrupt:  # presionar Ctrl + C para salir
    print("Cerrando...")
    db.close()
