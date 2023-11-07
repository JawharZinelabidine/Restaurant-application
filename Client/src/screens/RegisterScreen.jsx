import { Colors } from '../contants';
import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from "axios";
import ToastMessage from "../Component/ToastMessage";
import { useDispatch } from 'react-redux';


const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ fullname: '', email: '', password: '' });
  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const toastRef = useRef(null);
  const dispatch = useDispatch();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;


  const handleButtonPress = () => {
    navigation.navigate('LoginScreen');
  };

  const handleChange = (name, value) => {
    setInputs((values) => ({ ...values, [name]: value }));

    if ((name === 'firstName' || name === 'lastName') && inputs.firstName && inputs.lastName) {
      setInputs((values) => ({ ...values, fullname: `${values.firstName} ${values.lastName}` }));
    }
  };

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!emailRegex.test(inputs.email)) {
      setShowToast(true);
      if (toastRef.current) {
        toastRef.current.show();
      }
      return false;
    }
    if (!passwordRegex.test(inputs.password)) {
      setShowToast1(true);
      if (toastRef.current) {
        toastRef.current.show();
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validator()) {
      try {

        const { data } = await axios.post(`http://${apiUrl}:3000/api/customers/`, inputs);
navigation.navigate('LoginScreen');
        console.log('User added successfully', data);
        setShowToast2(true);
        if (toastRef.current) {
          toastRef.current.show();
        }

        dispatch(setOwnerId(data.owner));
        
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === 'Email already exists') {
          setShowToast3(true);
          if (toastRef.current) {
            toastRef.current.show();
          }
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DEFAULT_BLACK }}>
      {showToast && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text="Invalid email format"
          timeout={3000}
        />
      )}
      {showToast1 && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text="Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long."
          timeout={3000}
        />
      )}
      {showToast2 && (
        <ToastMessage
          ref={toastRef}
          type="success"
          text="Successfully Signed Up"
          timeout={3000}
        />
      )}
      {showToast3 && (
        <ToastMessage
          ref={toastRef}
          type="warning"
          text="Email already exists. Please use a different email address."
          timeout={3000}
        />
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Sign up for <Text style={{ color: Colors.DEFAULT_RED }}>MyApp</Text>
          </Text>
          <Text style={styles.subtitle}>
            Create a new account to access your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.nameInputs}>
            <View s style={[styles.input, styles.largeInput]}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                autoCapitalize="words"
                placeholder="John"
                onChangeText={(text) => handleChange('firstName', text)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>

            <View s style={[styles.input, styles.largeInput]}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                autoCapitalize="words"
                placeholder="Doe"
                onChangeText={(text) => handleChange('lastName', text)}
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
              />
            </View>
          </View>

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
              placeholder="********"
              onChangeText={(text) => handleChange('password', text)}
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>

            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ marginTop: 'auto' }} onPress={handleButtonPress}>
            <Text style={styles.formFooter}>
              Already have an account?{' '}
              <Text style={{ textDecorationLine: 'underline', color: Colors.DEFAULT_RED }}>
                Sign in
              </Text>
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
  nameInputs: {
    flexDirection: 'row', // Place first name and last name inputs side by side
    justifyContent: 'space-between', // Add some space between the inputs
  },
  largeInput: {
    width: 150, // Adjust the height as needed
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
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
    borderWidth: 1,
    backgroundColor: Colors.DEFAULT_RED,
    borderColor: Colors.DEFAULT_RED,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
export default RegisterScreen;
