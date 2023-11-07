import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,

} from "react-native";
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "../Component/RestaurantCard";
import { useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios'

export default function HomeScreen({ navigation, route }) {
  const categories = ["Italian", "Tunisian", "Japanese", "Lebanese", "Steakhouse", "Breakfast", "Mexican", "French"];

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const isFocused = useIsFocused();

  const [restaurant, setRestaurant] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://${apiUrl}:3000/api/restaurants`);
      setRestaurant(data);

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
      {/* Wrap the top section in a View with a white background */}
      <View style={styles.topSection}>
        <View>
          <Text style={styles.screenTitle}>
            Find the best{"\n"}restaurant near you.
          </Text>
        </View>
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
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.CategoryStyleView}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.CategoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    marginTop: 8,
    maxHeight: 40, // Add some spacing between categories
  },
});
