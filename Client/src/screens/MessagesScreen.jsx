import { StyleSheet, Text, View } from 'react-native'
import { Colors, Images } from "../contants";
import React from 'react'
import { io } from "socket.io-client";
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";

const MessagesScreen = () => {

  const socket = useRef()
  const isFocused = useIsFocused()
  const establishConnection = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      socket.current = io("ws://192.168.137.69:8900", {
        auth: {
          token: token,
        }
      });

      socket.current.emit("addUser");


      // Event handlers
      socket.current.on("connect", () => {
        console.log("Connected to server");
      });

      socket.current.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      socket.current.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }

  useEffect(() => {
    if (isFocused) {
      establishConnection()
    }

    else {
      // Close the socket connection when the component is not focused
      if (socket.current) {
        socket.current.disconnect();
      }
    }

    // Cleanup: Disconnect the socket when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };

  }, [isFocused]);



  return (
    <View style={styles.container}>
      <Text>MessagesScreen</Text>
    </View>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryBlackHex
  },
})