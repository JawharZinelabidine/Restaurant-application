import React from 'react';
import { View ,   StyleSheet,TouchableOpacity,TextInput,} from 'react-native';
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View style={styles.InputContainer}>
    <TouchableOpacity onPress={() => { }}>
      <AntDesign
        name="search1"
        size={24}
        color={Colors.DEFAULT_RED}
        style={styles.search}
      />
    </TouchableOpacity>
    <TextInput
      placeholder="Find a restaurant..."
      placeholderTextColor={Colors.primaryLightGreyHex}
      style={styles.TextInputContainer}
    />
  </View>
  );
}
const styles = StyleSheet.create({
    TextInputContainer: {
        height: 20 * 2,
        width: 300,
        
      },
      InputContainer: {
        flexDirection: "row",
        margin: 20,
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: "center",
        top: -47,

        boederWidth:2,
        borderColor:"black",
        shadowColor: "black", // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.4, // Shadow opacity
        shadowRadius: 4, // Shadow radius
        elevation: 2, // Android elevation (elevates the view)

      },
      search: {
        marginHorizontal: 10,
        shadowColor: "red", // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Shadow radius
        elevation: 2, // Android elevation (elevates the view)
      },
});