import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';






export default function ProfileIcon() {
  const navigation = useNavigation();
const profile = () => {
  navigation.navigate("CustomerProfile")
}





  return (
    <TouchableOpacity style={styles.imageContainer} onPress={profile} >
      <Image
        source={require('../assets/images/360_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.webp')}
        style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 66,
    width: 36,
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
  }

})