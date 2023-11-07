import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileIcon from "../Component/ProfileIcon";

const HeaderBar = () => {
  return (
    <View style={styles.HeaderContainer}>
        <ProfileIcon/>
    </View>
  );
}

const styles = StyleSheet.create({
    HeaderContainer:{
        padding:20,
        flexDirection:'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default HeaderBar;