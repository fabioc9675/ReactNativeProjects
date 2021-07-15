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

  // function that is execute when component finish mount
  componentDidMount() {
    this.fetchCats();
  }

  fetchCats() {
    this.setState({
      devices: [
        { name: "Fabian", key: "1", id: "a" },
        { name: "Felipe", key: "2", id: "b" },
        { name: "Margarita", key: "3", id: "c" },
        { name: "Bernardo", key: "4", id: "d" },
        { name: "Fabian", key: "5", id: "e" },
        { name: "Felipe", key: "6", id: "f" },
        { name: "Margarita", key: "7", id: "g" },
        { name: "Bernardo", key: "8", id: "h" },
        { name: "Fabian", key: "9", id: "i" },
        { name: "Felipe", key: "10", id: "j" },
        { name: "Margarita", key: "11", id: "k" },
        { name: "Bernardo", key: "12", id: "l" },
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
            keyExtractor={(item) => item.id} // funtion for change the key
            data={this.state.devices}
            renderItem={(
              { item } // function to render the items inside the list
            ) => (
              <TouchableOpacity
                onPress={() => this.setState({ text1: item.key })} // touchable propertie with on press function
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
    flex: 3,
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    marginVertical: 10,
    width: 300,
  },
  listText: {
    fontSize: 18,
    alignItems: "center",
    margin: 10,
    width: 280,
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
