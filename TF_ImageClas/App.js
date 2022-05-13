import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { fetch } from "@tensorflow/tfjs-react-native"; // npm install --force @tensorflow/tfjs-react-native@alpha
import * as jpeg from "jpeg-js";

// yarn add @react-native-community/async-storage @tensorflow/tfjs @tensorflow/tfjs-react-native expo-gl @tensorflow-models/mobilenet jpeg-js
// expo install expo-permissions expo-constants expo-image-picker

// Try the following
// Import it needs to be a jpeg image,
// https://free-images.com/sm/0e72/siberian_tiger_7.jpg
// https://i.pinimg.com/474x/d5/00/04/d50004ff0734e2754a8109abeba02c3c.jpg

export default function App() {
  console.log("Running App");

  const [url, setUrl] = useState(
    "https://free-images.com/sm/0e72/siberian_tiger_7.jpg"
  );
  const [displayText, setDisplayText] = useState("Loading");

  async function getPrediction(url) {
    setDisplayText("Loading Tensor Flow");
    await tf.ready();
    setDisplayText("Loading Mobile Net");
    const model = await mobilenet.load();
    setDisplayText("Fetching Image");
    const response = await fetch(url, {}, { isBinary: true });
    setDisplayText("Getting Image Buffer");
    const imageData = await response.arrayBuffer();
    setDisplayText("Getting Image Tensor");
    const imageTensor = imageToTensor(imageData);
    setDisplayText("Getting Classification Result");
    const prediction = await model.classify(imageTensor);
    setDisplayText(JSON.stringify(prediction));
  }

  function imageToTensor(rawData) {
    const { width, height, data } = jpeg.decode(rawData, true);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]; // Red
      buffer[i + 1] = data[offset + 1]; // Green
      buffer[i + 2] = data[offset + 2]; // Blue
      offset += 4; // Skips alpha values
    }
    return tf.tensor3d(buffer, [height, width, 3]);
  }

  return (
    <View style={styles.container}>
      <Text>Only works with Jpeg images.</Text>
      <TextInput
        style={{
          height: 40,
          width: "90%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={(text) => setUrl(text)}
        value={url}
      />
      <Image style={styles.imageStyle} source={{ uri: url }}></Image>
      <Button
        title="Classify Image"
        onPress={() => getPrediction(url)}
      ></Button>
      <StatusBar style="auto" />
      <Text>{displayText}</Text>
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
  imageStyle: {
    width: 300,
    height: 200,
  },
});
