import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Categorys({ restaurant, filterData, setFilterData }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const handleSelect = (val) => setSelectedCategory(val);
  useEffect(() => {
    console.log("Selected Category: ", selectedCategory);
    console.log("Restaurant Data: ", restaurant);

    if (selectedCategory) {
      const filteredList = restaurant.filter((elem) => {
        console.log("Current Restaurant: ", elem);
        if (Array.isArray(elem.category)) {
          const foundCategory = elem.category.find(
            (category) =>
              category &&
              typeof category === "string" &&
              category.toLowerCase() === selectedCategory.toLowerCase()
          );
          return foundCategory !== undefined;
        }
        return false;
      });
      console.log("Filtered List: ", filteredList);
      setFilterData(filteredList);
    } else {
      console.log("No Category Selected. Displaying All Restaurants.");
      setFilterData(restaurant);
    }
  }, [selectedCategory, restaurant]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.CategoryScrollViewStyle}
    >
      {category.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.CategoryStyleView}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={styles.CategoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  CategoryScrollViewStyle: {
    paddingHorizontal: 10,
    paddingTop: -30,
    paddingBottom: 20,
    position: "relative",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ActiveCategory: {
    flexDirection: "row",
  },
  CategoryText: {
    color: "black",
    margin: 10,
    textAlign: "center",
  },
  CategoryStyleView: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
  },
});
