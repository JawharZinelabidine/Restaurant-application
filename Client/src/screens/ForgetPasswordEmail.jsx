import { Colors } from '../contants';
import * as React from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const ForgetPasswordEmail = ({ navigation }) => {
  const handleButtonPress = () => {
    // Implement the logic to send a password reset email here.
    navigation.navigate('VerificationCodeScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.loginParent}>
        <Text style={styles.login1}>Forgot Password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="e.g., your.email@example.com"
            placeholderTextColor="#c8c8c8"
          />
        </View>

        <TouchableOpacity onPress={handleButtonPress} style={styles.loginButtonContainer}>
          <Text style={styles.loginButtonText}>Send Reset Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginParent: {
    marginTop: 16,
    padding: 20,
    width: '100%',
    height: '70%',
  },
  login1: {
    color: Colors.DEFAULT_RED,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 35,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 20,
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1.5,
    borderColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    padding: 16,
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
  },
  loginButtonContainer: {
    backgroundColor: Colors.DEFAULT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: 48,
  },
  loginButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ForgetPasswordEmail;
