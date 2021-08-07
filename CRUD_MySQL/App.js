import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios"; // npm install axios, db connector

// componentes personalizados
import ItemDato from "./components/ItemDato";
import Input from "./components/Input";

export default function App() {
  const [listaDatos, setListaDatos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const [topico, setTopico] = useState("");
  const [dato, setDato] = useState("");
  const [id, setId] = useState("");
  const [bandera, setBandera] = useState(false);

  console.log("MySQL App Running");

  useEffect(() => {
    getDatos();
  }, []);

  const getDatos = async () => {
    const respuesta = await axios.get("http://192.168.1.157/apiDatos/");
    setListaDatos(respuesta.data);
  };

  const addDato = async () => {
    const obj = { topico, usuario, dato };
    console.log(obj);
    const respuesta = await axios.post("http://192.168.1.157/apiDatos/", obj);
    alert(respuesta.data.msg);
    getDatos();
    setUsuario("");
    setTopico("");
    setDato("");
  };

  const deleteDato = async (props) => {
    const id = props.id;
    const respuesta = await axios.delete(
      "http://192.168.1.157/apiDatos/?ID=" + id
    );
    alert(respuesta.data.msg);
    getDatos();
  };

  const getDato = async (props) => {
    const id = props.id;
    const respuesta = await axios.get(
      "http://192.168.1.157/apiDatos/?ID=" + id
    );
    setId(respuesta.data.ID);
    setUsuario(respuesta.data.USUARIO);
    setTopico(respuesta.data.TOPIC);
    setDato(respuesta.data.DATO);
    setBandera(!bandera);
  };

  const updateDato = async () => {
    const obj = { ID, TOPIC, USUARIO, DATO };
    const respuesta = await axios.put("http://192.168.1.157/apiDatos/", obj);
    alert(respuesta.data.msg);
    setId("");
    setUsuario("");
    setTopico("");
    setDato("");
    setBandera(false);
    getDatos();
  };

  const addOrUpdate = () => {
    {
      bandera ? updateDato() : addDato();
    }
  };

  const renderItem = ({ item }) => (
    <ItemDato
      id={item.ID}
      getDato={getDato}
      usuario={item.USUARIO}
      topico={item.TOPIC}
      dato={item.DATO}
      mypress={deleteDato}
    />
  );

  return (
    <View style={styles.container}>
      <Text>Hola Fabian!</Text>

      <View style={{ flex: 0.1, marginTop: 20, marginBottom: 25 }}>
        <Text style={{ fontWeight: "bold", color: "#0E69E5", fontSize: 20 }}>
          CRUD REACT NATIVE PHP Y MYSQL
        </Text>
      </View>
      <Input texto={"Usuario"} valor={usuario} campo={(e) => setUsuario(e)} />
      <Input texto={"Topico"} valor={topico} campo={(e) => setTopico(e)} />
      <Input texto={"Dato"} valor={dato} campo={(e) => setDato(e)} />
      <TouchableOpacity
        style={{ backgroundColor: "#0E69E5", padding: 15, borderRadius: 12 }}
        onPress={addOrUpdate}
      >
        <Text style={{ color: "#fff" }}>{bandera ? "Edit" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        style={{ marginTop: 15 }}
        data={listaDatos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
