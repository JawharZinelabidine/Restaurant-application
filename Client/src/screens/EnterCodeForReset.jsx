import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors } from '../contants';
import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const EnterCodeForVerification = ({ navigation,route }) => {
  const codeRef = useRef();

  const [code, setCode] = useState('');
  const { email } = route.params;

  const handleChangeCode = (text) => {
    setCode(text);
  };

  const verifyResetCode = async () => {
    try {
      const response = await axios.post(`http://${apiUrl}:3000/api/customers/verifyresetcode`, { email, resetCode: code });
      
      if (response.status === 200) {
        navigation.navigate("UpdatePassword" , { email });
      } else {
        console.log('Error verifying reset code:', response.status);
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.forgotPasswordParent}>
        <Text style={styles.forgotPasswordTitle}>Verify Reset Code</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter the Reset Code</Text>
          <TextInput
            onChangeText={handleChangeCode}
            value={code}
            placeholder="1234"
            placeholderTextColor="#c8c8c8"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.emailInput}
            ref={codeRef}
          />
        </View>
        <TouchableOpacity
          style={styles.sendResetButtonContainer}
          onPress={verifyResetCode}
        >
          <Text style={styles.sendResetButtonText}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordParent: {
    marginTop: 5,
    padding: 20,
    width: '100%',
    height: '70%',
  },
  forgotPasswordTitle: {
    color: Colors.DEFAULT_RED,
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  emailInput: {
    borderWidth: 1.5,
    borderColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    padding: 16,
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    textAlign: 'center',
  },
  sendResetButtonContainer: {
    backgroundColor: Colors.DEFAULT_RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  sendResetButtonText: {
    color: Colors.DEFAULT_WHITE,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default EnterCodeForVerification;
