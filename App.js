import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
// import * as ImagePicker from "expo-image-picker";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";

const PlaceholderImage = require("./assets/images/background-image.png");
const bgImage = require("./assets/images/bg.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <ImageViewer placeholderImageSource={PlaceholderImage} /> */}
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>

        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" />
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#25292e",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
    // opacity: 0.95,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
