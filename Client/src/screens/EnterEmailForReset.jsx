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
import ToastMessage from '../Component/ToastMessage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const EnterEmailForReset = ({ navigation }) => {
    const emailRef = useRef();
    const toastRef = useRef(null);
  
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);
  
    const handleChangeEmail = (text) => {
      setEmail(text);
    };
  
    const sendResetEmail = async () => {
        try {
            const response = await axios.post(`http://${apiUrl}:3000/api/customers/forgotpassword`,  email );
          if (response.status === 200) {
            setShowToast(true);
            if (toastRef.current) {
              toastRef.current.show();
            }
          } else {
            console.log('Error sending reset email:', response.status);
          }
        } catch (error) {
            console.error('Error sending reset email:', error);
            if (error.response && error.response.status === 404) {
              console.log('Email not found. Please double-check your email address.');
            } else {
              console.log('Unexpected error:', error.message);
            }
          }
        };

 
    return (
        <ScrollView contentContainerStyle={styles.container}>
          {showToast && (
            <ToastMessage ref={toastRef} type="success" text="Password reset instructions sent to your email." timeout={3000} />
          )}
    
          <View style={styles.forgotPasswordParent}>
            <Text style={styles.forgotPasswordTitle}>Forgot Password</Text>
    
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter your Email</Text>
              <TextInput
                onChangeText={handleChangeEmail}
                value={email}
                placeholder="example@example.com"
                placeholderTextColor="#c8c8c8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.emailInput}
                ref={emailRef}
              />
            </View>
    
            <TouchableOpacity style={styles.sendResetButtonContainer} onPress={sendResetEmail}>
              <Text style={styles.sendResetButtonText}>Send Reset Email</Text>
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

export default EnterEmailForReset;
