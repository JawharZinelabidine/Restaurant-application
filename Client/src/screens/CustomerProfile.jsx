import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setLoggedin } from '../features/loggedinSlice';

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
      <StatusBar style="light" />
      <View style={styles.topSection}>
 
        <View style={styles.blackTopSection}>
   
        </View>
      </View>
          {userData ? (
               <View style={styles.profile}>
               <View style={styles.userImageContainer}>
            <Image
             source={{ uri: userData.profilePic }} 
              style={styles.userImage}
            />
          </View>
       
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData.fullname}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>

          </View>
           </View>
           ) : (
            <ActivityIndicator size="large" color="black" />
            )}
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust the background color as needed
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
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    left: 140,
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundColor:"red"
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
  profile:{
    top: -50,
  }
});
