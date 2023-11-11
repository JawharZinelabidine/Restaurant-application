import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "../contants";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const UpdatePassword = ({ navigation, route }) => {
  const newPasswordRef = useRef();

  const [newPassword, setNewPassword] = useState("");
  const { email } = route.params;

  const handleChangeNewPassword = (text) => {
    setNewPassword(text);
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put(
        `http://${apiUrl}:3000/api/customers/updatepassword`,
        { email, newPassword: newPassword }
      );

      if (response.status === 200) {
        navigation.navigate("LoginScreen");
      } else {
        console.log("Error updating password:", response.status);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.updatePasswordParent}>
        <Text style={styles.updatePasswordTitle}>Update Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter the New Password</Text>
          <TextInput
            onChangeText={handleChangeNewPassword}
            value={newPassword}
            placeholder="Enter your new password"
            returnKeyType="done"
            placeholderTextColor="#c8c8c8"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.passwordInput}
            ref={newPasswordRef}
          />
        </View>
        <TouchableOpacity
          style={styles.updatePasswordButtonContainer}
          onPress={updatePassword}
        >
          <Text style={styles.updatePasswordButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  updatePasswordParent: {
    marginTop: 5,
    padding: 20,
    width: "100%",
    height: "70%",
  },
  updatePasswordTitle: {
    color: Colors.DEFAULT_RED,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  passwordInput: {
    borderWidth: 1.5,
    borderColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    padding: 16,
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    textAlign: "center",
  },
  updatePasswordButtonContainer: {
    backgroundColor: Colors.DEFAULT_RED,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  updatePasswordButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default UpdatePassword;
