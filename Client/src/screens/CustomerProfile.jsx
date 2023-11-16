import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

export default function CustomerProfile({navigation}) {
  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [userData, setUserData] = useState(null);

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
    {userData ? (
      <>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />
          <Text style={styles.fullName}>{userData.fullname}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>
      </>
    ) : (
      <></>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, 
    marginBottom: 10, 
    backgroundColor:"black"
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});
