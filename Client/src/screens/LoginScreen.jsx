import { Colors } from "../contants";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setId, setFullname, setEmail } from '../../src/features/customerSlice';
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ToastMessage from "../Component/ToastMessage";

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;




  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const toastRef = useRef(null);

  const handleButtonPress = () => {
    navigation.navigate('RegisterScreen');
  };

  const handleChange = (name, value) => {
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validator = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {

      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validator()) {
      try {

        const { data } = await axios.post(`http://${apiUrl}:3000/api/customers/signin`, inputs);
        dispatch(setId(data.customer.id));
        dispatch(setFullname(data.customer.fullname));
        dispatch(setEmail(data.customer.email));


        console.log('Customer logged successfully');

        setShowToast1(true);
        if (toastRef.current) {
          toastRef.current.show();
        }
        navigation.navigate('Home');
      
      } catch (error) {
        setShowToast(true);
        if (toastRef.current) {
          toastRef.current.show();
        }
        console.log(error);
      }
    }
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DEFAULT_BLACK }}>
      {showToast && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text="Wrong information"
          timeout={3000}
        />
      )}

      {showToast1 && (
        <ToastMessage
          ref={toastRef}
          type="success"
          text="logged in successfully"
          timeout={3000}
        />
      )}
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Sign in to <Text style={{ color: Colors.DEFAULT_RED }}>MyApp</Text>
          </Text>

          <Text style={styles.subtitle}>
            Login so you can make a reservation.
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => handleChange('email', text)}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              onChangeText={(text) => handleChange('password', text)}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity>
            <Text style={{ color: Colors.DEFAULT_RED }}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleButtonPress} style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: Colors.DEFAULT_RED }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: Colors.DEFAULT_WHITE,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 130,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.DEFAULT_WHITE,
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.DEFAULT_WHITE,
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: Colors.DEFAULT_BLACK,
    borderColor: Colors.DEFAULT_RED,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.DEFAULT_WHITE,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_RED,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },

});
