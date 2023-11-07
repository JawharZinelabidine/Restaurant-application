import React, { useState } from "react";

import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "../Component/RestaurantCard";
import { useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios'
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderBar from "./HeaderBar";
import SearchBar from "../Component/SearchBar";
import Categorys from "../Component/Categorys";

export default function HomeScreen({ navigation, route }) {
  const category = [
    "Italian",
    "Tunisian",
    "Japanese",
    "Lebanese",
    "Steakhouse",
    "Breakfast",
    "Mexican",
    "French",
  ];

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const isFocused = useIsFocused();

  const [restaurant, setRestaurant] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://${apiUrl}:3000/api/restaurants`);
      setRestaurant(data);
      setRestaurant(data);
      setFilterData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData()
    }

  }, [isFocused])


  const handleButtonPress = (restaurant) => {
    navigation.navigate("RestaurantDetails", { restaurant });
    console.log(restaurant);
  };

  return (
    <ScrollView
      vertical
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewFlex}
    >
      <View style={styles.topSection}>
        <HeaderBar />
        <Text style={styles.screenTitle}>
          Find the best{"\n"}restaurant near you.
        </Text>
      </View>
      <View style={styles.categorySearchContainer}>
        <SearchBar
          restaurant={restaurant}
          filterData={filterData}
          setFilterData={setFilterData}
        />
        <Categorys
          restaurant={restaurant}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </View>
      <ScrollView vertical>
        {filterData.map((rest) => (
          <View key={rest.id}>
            <RestaurantCard
              restaurant={rest}
              onPress={(restaurant) => handleButtonPress(restaurant)}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.topedite}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topSection: {
    backgroundColor: 'white',
    paddingBottom: 2, // Adjust the height of the white section as needed
  },
  screenTitle: {
    fontSize: 25,
    color: "black",
    paddingLeft: 30,
    top: 100,
  },
  TextInputContainer: {
    height: 20 * 2,
    width: 300,
  },
  InputContainer: {
    flexDirection: "row",
    margin: 30,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    top: 100,
    marginBottom: 110,
  },
  search: {
    marginHorizontal: 10,
  },
  scrollViewFlex: {},
  CategoryScrollViewStyle: {
    paddingHorizontal: 10,
  },
  ActiveCategory: {
    flexDirection: "row",
    marginBottom: 20,
  },
  CategoryText: {
    color: "black",
    margin: 10,
    // Add border radius to make it round
    textAlign: "center", // Center text horizontally
  },
  CategoryStyleView: {
    flex: 1,
    overflow: "hidden", // Clip content to stay within rounded border
    borderWidth: 1, // Add a border for better visibility
    borderColor: "white", // Color of the border
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: 40, // Add some spacing between categories
  },
});
