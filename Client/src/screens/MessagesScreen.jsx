import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Images } from "../contants";
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from '../../services/axiosInterceptor.jsx'
import { Display } from "../utils";
import Messages from '../Component/Messages.jsx'
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { io } from "socket.io-client";
import { AntDesign } from "@expo/vector-icons";

const MessagesScreen = ({ route, navigation }) => {

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const conversation = route.params.conversation;
  const restaurants = route.params.restaurants;
  const socket = useRef()
  const inputRef = useRef(null);

  const [messages, setMessages] = useState([])

  const restaurantName = restaurants.slice().find((restaurant) => {
    return restaurant.id === conversation.restaurantId;
  });


  const getMessages = async () => {
    try {

      const { data } = await axios.get(`http://${apiUrl}:3000/api/messages/customer/messages/${conversation.restaurantId}`)
      setMessages(data)
    } catch (error) {
      console.log(error)
      if (error && error.response.status === 403 || error && error.response.status === 401) {
        await SecureStore.deleteItemAsync('token')
        navigation.navigate('LoginScreen')
      }
    }

  }

  const handleMessageChange = (text) => {
    setMessage(text);
    const lineCount = text.split('\n').length;
    inputRef.current.setNativeProps({
      height: 35 * Math.min(lineCount + 1, 6), // Set maximum number of lines to 6 (adjust as needed)
    });
  };

  useEffect(() => {
    getMessages()
  }, [])


  return (


    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>
            <AntDesign name="left" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {restaurantName.name}
        </Text>
        <View style={styles.lineSeparator1} />

      </View>

      <ScrollView style={styles.constainer2} contentContainerStyle={styles.scrollViewContent}>
        {messages.map((message) => (
          <Messages key={message.id} message={message} />


        ))}



      </ScrollView>
      <View style={styles.lineSeparator2} />

      <View style={styles.chatBoxBottom}>
        <TextInput style={styles.chatMessageInput}
          ref={inputRef}
          multiline={true}
          onChangeText={handleMessageChange}
          numberOfLines={1}
          placeholder="Write something...">

        </TextInput>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="send" size={40} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.primaryBlackHex,


  },

  constainer2: {
    flex: 1,
    backgroundColor: Colors.DARK_ONE,

  },

  header: {
    marginTop: 100,

  },
  headerText: {
    fontSize: 25,
    color: "white",
    paddingLeft: 150,
    bottom: 30,
  },

  scrollViewContent: {
    paddingVertical: 10,
  },

  chatBoxBottom: {
    marginBottom: 35,
    marginLeft: 20,
    display: 'flex',
  },
  button: {
    marginLeft: 330,
    bottom: 60
  },

  chatMessageInput: {
    width: Display.setWidth(75),
    padding: 3,
    color: 'black',
    borderColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  lineSeparator1: {
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,

  },

  lineSeparator2: {
    height: 1,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 20,

  },
  backButton: {
    borderRadius: 8,
    backgroundColor: "#F00",
    padding: 12,
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 30,
    left: 20,
    zIndex: 1,
  },
})