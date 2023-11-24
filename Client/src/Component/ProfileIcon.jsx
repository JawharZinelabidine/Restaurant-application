import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { setLoggedin } from '../features/loggedinSlice';






export default function ProfileIcon() {

  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = () => {
    navigation.navigate("CustomerProfile")
  }

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const imagePath = userData?.profilePic ? { uri: userData?.profilePic } : require('../assets/images/360_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.webp');


  useEffect(() => {
    const fetchUserData = async () => {
      const token = await SecureStore.getItemAsync('token');
      if (token) {
        try {
          const response = await axios.get(`http://${apiUrl}:3000/api/customers/profile/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
          dispatch(setLoggedin(true));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    }
    fetchUserData()

  }, []);


  return (
    <TouchableOpacity style={styles.imageContainer} onPress={profile} >
      <Image
        source={imagePath}
        style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 66,
    width: 46,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

  },
  image: {
    height: 36,
    width: 36,
    borderRadius: 50,


  }

})