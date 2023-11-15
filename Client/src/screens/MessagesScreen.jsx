import { StyleSheet, Text, View } from 'react-native'
import { Colors, Images } from "../contants";
import React from 'react'

const MessagesScreen = () => {
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
        backgroundColor:Colors.primaryBlackHex
    },
})