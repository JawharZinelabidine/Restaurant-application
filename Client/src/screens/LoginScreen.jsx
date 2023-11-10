import { Colors } from "../contants";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setId, setFullname, setEmail } from '../../src/features/customerSlice';
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable
} from "react-native";
import ToastMessage from "../Component/ToastMessage";
import * as Notifications from 'expo-notifications';
import store from '../features/store'
import { useSelector } from 'react-redux';
import { setToast } from '../../src/features/notificationSlice';

export default function LoginScreen({ navigation }) {

  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { toast } = useSelector(state => state.notification);


  const customer = store.getState().customer


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


  async function registerForPushNotificationsAsync(customerID) {
    try {
      const { status } = await Notifications.requestPermissionsAsync()
      console.log(status)
      if (status !== "granted") {
        console.log("Failed to get permission")
        return null
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } catch (error) {
      console.log('register error', error)
    }

    try {
      const token = (await Notifications.getExpoPushTokenAsync({
        projectId: "c7b31030-5842-4db5-bc82-2aeecdaf9fd1",
      })).data
      console.log(token)
      const { data } = await axios.put(`http://${apiUrl}:3000/api/customers/${customerID}`, { token: token })
      console.log('token added successfully', token)
      navigation.navigate('Home');


    }
    catch (error) {
      console.log('couldn"t get Expo token', error)
    }

  }


  const handleSubmit = async () => {
    if (validator()) {
      try {

        const { data } = await axios.post(`http://${apiUrl}:3000/api/customers/signin`, inputs);
        dispatch(setId(data.customer.id));
        dispatch(setFullname(data.customer.fullname));
        dispatch(setEmail(data.customer.email));
        await registerForPushNotificationsAsync(data.customer.id)


        console.log('Customer logged successfully');

        setShowToast1(true);
        if (toastRef.current) {
          toastRef.current.show();
        }

      } catch (error) {
        store.dispatch(setToast(true))
        if (toastRef.current) {
          toastRef.current.show();
        }
        console.log(error);
      }
    }
  };

  return (
    <>


      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>

        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.title}>
              Sign in to <Text style={{ color: Colors.DEFAULT_RED }}>Rezervi</Text>
            </Text>

            <Text style={styles.subtitle}>
              Login so you can make a reservation at the to restaurants in your area
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
      {toast && (
        <ToastMessage
          style={styles.try}
          ref={toastRef}
          type="danger"
          text="Wrong information"
          timeout={3000}
        />
      )}
    </>
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
    backgroundColor: "black",
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
  }

});
