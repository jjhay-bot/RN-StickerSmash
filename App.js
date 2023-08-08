import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import Button from "./components/Button";
import ImageViewer from "./components/ImageViewer";
// import * as ImagePicker from "expo-image-picker";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState, useRef } from "react";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import domtoimage from "dom-to-image";
import Touchable from "./components/Touchable";
import ScrollViewArea from "./components/ScrollViewArea";
import ListFlat from "./components/ListFlat";

const PlaceholderImage = require("./assets/images/background-image.png");
// const bgImage = require("./assets/images/bg.png");

export default function App() {
  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (status === null) {
    requestPermission();
  }

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
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log("e", e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <ImageBackground source={bgImage} resizeMode="cover" style={styles.imageContainer}> */}
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            {/* <ImageViewer placeholderImageSource={PlaceholderImage} /> */}
            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
          </View>
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
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>

        <StatusBar style="light" />
      </View>
      {/* </ImageBackground> */}

      <Touchable />
      <ScrollViewArea />
      <ListFlat />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#25292e",
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
