import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import customAxios from '../../services/axiosInterceptor';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setLoggedin } from '../features/loggedinSlice';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function CustomerProfile({ navigation }) {
  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const altProfileImage = require('../assets/images/icons8-customer-50.png')


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setLoading(true);

      try {
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const formData = new FormData();
        formData.append("profilePic", fileContent);
        console.log(formData)
        await customAxios.put(`http://${apiUrl}:3000/api/customers/profilePic`, formData, {
          uri: image,
          type: "image/jpeg",
          name: "profile-image.jpg",
        });
        await fetchUserData()
        setLoading(false);

      }
      catch (error) {
        console.log(error)
        setLoading(false);
      }
    }
  };




  useEffect(() => {
    const fetchUserData = async () => {
      const token = await SecureStore.getItemAsync('token');
      try {
        const response = await axios.get(`http://${apiUrl}:3000/api/customers/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        dispatch(setLoggedin(true));
      } catch (error) {
        navigation.navigate('LoginScreen');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <View style={styles.container}>

      <StatusBar style="light" />

      {userData ? (
        <View style={styles.profile}>
          <View style={styles.userImageContainer}>
            <Image
              source={userData.profilePic ? userData.profilePic : altProfileImage}
              style={styles.userImage}
            />
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={pickImage}
            >
              <Text style={styles.buttonText}>Change profile picture</Text>
            </TouchableOpacity>
          </View>

        </View>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            style={styles.spinner}
            size="large"
            color="#3498db" // Change the color as needed
          />
        </View>
      )}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // Adjust the background color as needed
    alignItems: 'center'

  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  },
  spinner: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#3498db',
    borderRadius: 50,
    width: 40,
    height: 40,
    // You may need to define custom animation for the spinner in React Native
  },
  menuButton: {
    borderRadius: 16,
    backgroundColor: "#F00",
    paddingVertical: 8,
    paddingHorizontal: 24,
    top: 5
  },
  buttonText: {
    color: 'white'
  },
  topSection: {
    backgroundColor: 'black',
    paddingTop: 20,
    paddingBottom: 150,
    alignItems: 'center',
  },
  blackTopSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  userImageContainer: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'center'
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    top: 6
  },
  userDetails: {
    alignItems: 'center',
  },
  userName: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: 'black',
    fontSize: 16,
    alignItems: 'flex-start',
  },
  profile: {
    alignSelf: 'center',
    top: '40%'
  }
});
