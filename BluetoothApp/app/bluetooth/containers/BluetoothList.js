import React from "react";
import { View, Text, FlatList } from "react-native";

import Layout from "../components/bluetoothListLayout";
import Empty from "../components/empty";
import Toggle from "../components/toggle";
import Subtitle from "../components/subtitle";
//import BluetoothSerial from "react-native-bluetooth-serial-next";

function BluetoothList(props) {
  const list = [
    { name: "Cristhian", key: "1" },
    { name: "Lara", key: "2" },
  ];

  const renderEmpty = () => <Empty text="No hay dispositivos" />;

  return (
    <Layout title="Bluetooth">
      <Toggle />
      <Subtitle title="Lista de dispositivos" />
      <FlatList
        data={list}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 20 }}>{item.name}</Text>
        )}
      />
    </Layout>
  );
}

export default BluetoothList;
