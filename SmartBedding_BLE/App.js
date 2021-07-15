import React, { Component, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { BleManager, Base64 } from "react-native-ble-plx";
import { alignContent } from "styled-system";

export default class SB_BLE extends Component {
  // creation of constructor for SB_BLE
  constructor() {
    super();
    this.manager = new BleManager();
    this.state = {
      devices: [],
      deviceid: "",
      serviceUUID: "",
      characteristicsUUID: "",
      text1: "Hello BLE",
      makedata: [],
      showToast: false,
      notificationReceiving: false,
    };
    console.log("App is running");
  }

  componentDidMount() {
    this.fetchCats();
  }

  fetchCats() {
    this.setState({
      devices: [
        { name: "Fabian", key: "1" },
        { name: "Felipe", key: "2" },
        { name: "Margarita", key: "3" },
        { name: "Bernardo", key: "4" },
        { name: "Fabian", key: "5" },
        { name: "Felipe", key: "6" },
        { name: "Margarita", key: "7" },
        { name: "Bernardo", key: "8" },
        { name: "Fabian", key: "9" },
        { name: "Felipe", key: "10" },
        { name: "Margarita", key: "11" },
        { name: "Bernardo", key: "12" },
      ],
    });
  }

  changeTextFunction = () => {
    this.setState({
      text1: "Disconnect",
      deviceid: "noNull",
    });
  };

  // function for disconnect device
  disconnect() {
    console.log("disconnect");
    this.setState({
      deviceid: "",
      text1: "Hola Fabian",
    });
  }

  // function fos scan and connect device
  async scanAndConnect() {
    console.log("scan and connect");
    this.setState({ text1: "Scanning..." });
  }

  // function for write message through ble
  writeMessage(code, message) {
    console.log(code);
    this.setState({
      text1: message,
    });
  }

  // creation of render function to put the components in the screen
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hello SmartBedding</Text>
        <View style={styles.bleContainer}>
          {this.state.deviceid ? (
            <Button title={"Disconnect"} onPress={() => this.disconnect()} />
          ) : (
            <Button title={"Scan"} onPress={() => this.scanAndConnect()} />
          )}
        </View>
        <View style={styles.textBox}>
          <Text>{this.state.text1}</Text>
        </View>
        <View style={styles.listBox}>
          <FlatList
            data={this.state.devices}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.setState({ text1: item.key })}
              >
                <Text style={styles.listText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.fotter}>
          <Button
            title={"Ack"}
            onPress={() => this.writeMessage("ACK", "ACK Writted")}
          />
          <Button
            title={"Ris 0"}
            onPress={() => this.writeMessage("Ris 0", "Ris 0 Writted")}
          />
          <Button
            title={"Ris 1"}
            onPress={() => this.writeMessage("Ris 1", "Ris 1 Writted")}
          />
        </View>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content"
          showHideTransition="none"
          hidden="Visible"
        />
      </SafeAreaView>
    );
  }
}

// styles object
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    paddingTop: 25,
  },
  bleContainer: {
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textBox: {
    alignItems: "center",
    marginVertical: 10,
  },
  listBox: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    marginVertical: 10,
    width: 300,
  },
  listText: {
    fontSize: 18,
    alignItems: "center",
    margin: 10,
  },
  fotter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 50,
    width: 280,
    justifyContent: "space-between",
  },
});
