import React,{useEffect} from 'react'
import { View, Text , StyleSheet, Image} from 'react-native'
import { Colors, Images } from "../contants";
import { Display } from "../utils";


export default function Logo({navigation}) {

useEffect(() => {
setTimeout(()=>{
    navigation.navigate("Splash")
},2000)
},[])

  return (
    <View style={styles.container}>
      <Image source={Images.LOGO} resizeMode='contain' style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    } , image: {
        height:Display.setHeight(80),
        width:Display.setWidth(100),
      },
})