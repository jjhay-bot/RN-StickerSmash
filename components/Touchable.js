import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";

export default function Touchable() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#fff"
        onPress={() => {
          setCount(count + 1);
        }}>
        <Text style={styles.text}>Press me!</Text>
      </TouchableHighlight>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => {
          setCount(count + 1);
        }}>
        <Text style={styles.text}>Press me!</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{`Pressed ${count} times`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#F88",
  },
  text: {
    fontSize: 18,
    padding: 3,
  },
});
