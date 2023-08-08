import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
// import * as ImagePicker from "expo-image-picker";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";

const PlaceholderImage = require("./assets/images/background-image.png");
const bgImage = require("./assets/images/bg.png");

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    let result = await launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <ImageViewer placeholderImageSource={PlaceholderImage} /> */}
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        </View>

        {/* ACTION BUTTONS */}
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )}

        {/* MODAL */}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          {/* A list of emoji component will go here */}
        </EmojiPicker>

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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
