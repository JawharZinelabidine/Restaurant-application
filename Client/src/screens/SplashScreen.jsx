import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Images, Fonts } from "../contants";
import { Display } from "../utils";

export default function Splashscreen({ navigation }) {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleButtonPress = () => {
    setButtonPressed(true);
    navigation.navigate("TabNav");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={Images.PIZZA}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.DEFAULT_BLACK}
          translucent
        />
        <View style={styles.imageContainer}></View>
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.linearGradient}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            Food so good, it's a hug for your taste buds.
          </Text>
          <Text style={styles.secondText}>
            "Reserve the moment, savor the experience."
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={handleButtonPress}
            underlayColor="red"
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  imageContainer: {
    height: Display.setHeight(60),
    width: Display.setWidth(60),
  },
  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 0,
    bottom: 100,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  mainText: {
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 0,
    color: Colors.DEFAULT_WHITE,
    bottom: 300,
  },
  secondText: {
    fontSize: 20,
    marginBottom: 0,
    color: Colors.DEFAULT_GREY,
    bottom: 250,
  },
  button: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
