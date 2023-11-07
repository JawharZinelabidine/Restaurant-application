import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RestaurantCard from "../Component/RestaurantCard";
import { useEffect } from "react";
import HeaderBar from "./HeaderBar";
import SearchBar from "../Component/SearchBar";
import Categorys from "../Component/Categorys";

export default function HomeScreen({ navigation, route }) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [restaurant, setRestaurant] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${apiUrl}:3000/api/restaurants`);
      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    
        <SearchBar />
        <Categorys />
      </View>

      <ScrollView vertical>
        {restaurant.map((rest) => (
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
  
    backgroundColor: "white",
  },
  topSection: {
    backgroundColor: "black",
    paddingBottom: 100,
    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.7, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // Android elevation (elevates the view)
  },
  screenTitle: {
    fontSize: 25,
    color: "white",
    paddingLeft: 30,
    top: 50,
  },
  scrollViewFlex: {
    marginBottom:-50
  
  },
  categorySearchContainer: {
    flexDirection: "column",
  },
  topedite:{
    marginTop:100
  }
});
