import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";

export default function SearchBar({ restaurant, filterData, setFilterData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (val) => setSearchTerm(val);
  useEffect(() => {
    if (searchTerm && searchTerm !== "") {
      const newData = restaurant.filter((elem) =>
        elem.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(searchTerm);

      setFilterData(newData);
      console.log(newData);
    } else {
      setFilterData(restaurant);
    }
  }, [searchTerm]);

  return (
    <View style={styles.InputContainer}>
      <TouchableOpacity onPress={() => {}}>
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
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
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
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  search: {
    marginHorizontal: 10,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});
