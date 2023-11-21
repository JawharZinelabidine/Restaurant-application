import {View , Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

export default function CustomerProfile() {
  return (
    <View
    style={{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Text style={{ color: '#fff' }}>Notice that the status bar has light text!</Text>
    <StatusBar style="dark" />
  </View>
  )
}