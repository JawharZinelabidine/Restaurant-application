import { Colors } from '../contants';
import React, { useState , useRef, useEffect} from 'react';
import { Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ToastMessage from "../Component/ToastMessage";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const inputs = Array(4).fill("")
let newInputIndex = 0

const isObjValid = (obj) => {
  return Object.values(obj).every(val => val.trim())
}

const VerificationCodeScreen = ({ navigation }) => {
  const inputRefs = inputs.map(() => useRef());
  const toastRef = useRef(null);
  
  const [OTP, setOTP] = useState({0:"",1:"",2:"",3:""});
  const [nextInputIndex, setNextInputIndex] = useState(0)
  const [showToast, setShowToast] = useState(false);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);


  const handleChangeText = (text, index) => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP);

    const lastInputIndex = inputs.length - 1;
    if(!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    
    setNextInputIndex(newInputIndex)

  }

  useEffect(() => {
    inputRefs[nextInputIndex].current.focus();
  }, [nextInputIndex]);

const verifyEmail = async () => {
  const otp = Object.values(OTP).join('');
  try {
    const response = await axios.get(`http://${apiUrl}:3000/api/customers/verify/${otp}`);

    if (response.status === 200) {  
      navigation.navigate('LoginScreen'); 
      setShowToast(true);
      if (toastRef.current) {
        toastRef.current.show();
      }
      return false   
    } else {
      setShowToast1(true);
      if (toastRef.current) {
        toastRef.current.show();
      }
      return false;
    }
  } catch (error) {
    setShowToast2(true);
    if (toastRef.current) {
      toastRef.current.show();
    }
    return false;
  }
};

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showToast && (
        <ToastMessage
          ref={toastRef}
          type="success"
          text="welcome"
          timeout={3000}
        />
      )}
      {showToast1 && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text="invaide code"
          timeout={3000}
        />
      )}
      {showToast2 && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text="invaide code"
          timeout={3000}
        />
      )}
      <View style={styles.loginParent}>
        <Text style={styles.login1}>Verification Code</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Verification Code</Text>
          <View style={styles.codeInputContainer}>
            {inputs.map((inp, index) => (
              <TextInput
                key={index}
                onChangeText={(text)=>handleChangeText(text, index)}
                value={OTP[index]}
                placeholder="0"
                placeholderTextColor="#c8c8c8"
                keyboardType="numeric"
                maxLength={1}
                style={styles.codeInput}
                ref={inputRefs[index]}

              />
            ))}
          </View>
        </View>

        <TouchableOpacity  style={styles.loginButtonContainer} onPress={verifyEmail}>
          <Text style={styles.loginButtonText} >Verify Code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    padding: 16,
    color: Colors.DEFAULT_WHITE,
    fontSize: 18,
    textAlign: 'center',
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

export default VerificationCodeScreen;
