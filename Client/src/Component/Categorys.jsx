import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

export default function Categorys({ restaurant, filterData, setFilterData }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const category = [
    "All",
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
    if (selectedCategory === "All") {
      setFilterData(restaurant);
    } else {
      const filteredList = restaurant.filter((elem) => {
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
      setFilterData(filteredList);
    }
  }, [selectedCategory, restaurant]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.CategoryScrollViewStyle}
    >
      {category.map((categoryName, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.CategoryStyleView,
            selectedCategory === categoryName && styles.ActiveCategory,
          ]}
          onPress={() => handleSelect(categoryName)}
        >
          <Text
            style={[
              styles.CategoryText,
              selectedCategory === categoryName && styles.SelectedCategoryText,
            ]}
          >
            {categoryName}
          </Text>
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
    backgroundColor: "red",
  },
  CategoryText: {
    color: "black",
    margin: 10,
    textAlign: "center",
  },
  SelectedCategoryText: {
    color: "white",
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
