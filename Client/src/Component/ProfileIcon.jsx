import React from 'react';
import { View, Image , StyleSheet} from 'react-native';

export default function ProfileIcon() {
  return (
    <View style={styles.imageContainer}>
    <Image
    source={require('../assets/images/360_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.webp')} 
    style={styles.image} />
     </View>
  );
}

const styles = StyleSheet.create({
    imageContainer:{
        height:36,
        width:36,
        borderRadius:12,
        borderWidth:2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image:{
        height:36,
        width:36,
    }

})