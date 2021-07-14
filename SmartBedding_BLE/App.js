import React, { Component, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { BleManager } from "react-native-ble-plx";

export default class SB_BLE extends Component {
  // creation of constructor for SB_BLE
  constructor() {
    super();
    this.manager = new BleManager();
  }

  // creation of render function to put the components in the screen
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hello SmartBedding</Text>
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
});
