import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RestaurantCard from "../Component/RestaurantCard";
import { useEffect } from "react";
import HeaderBar from "./HeaderBar";
import SearchBar from "../Component/SearchBar";
import Categorys from "../Component/Categorys";

export default function HomeScreen({ navigation, route }) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const isFocused = useIsFocused();

  const [restaurant, setRestaurant] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://${apiUrl}:3000/api/restaurants`);
      if (response.ok) {
        const data = await response.json();
        setRestaurant(data);
		setFilterData(data)

      } else {
        console.error("Failed to fetch data");
      }
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
  const handleSearch=(val)=>setSearchTerm(val)
  useEffect(()=>{
    if(searchTerm && searchTerm !==''){
      const newData=restaurant.filter(elem=>elem.name.toLowerCase().includes(searchTerm.toLowerCase()))
      console.log(searchTerm)
     
      setFilterData(newData)
      console.log(newData)
    }
    else{
      setFilterData(restaurant)
    }
  },[searchTerm])
  const handleSelect = (val) => setSelectedCategory(val);
  useEffect(() => {
    console.log("Selected Category: ", selectedCategory);
    console.log("Restaurant Data: ", restaurant);
  
    if (selectedCategory) {
      const filteredList = restaurant.filter(elem => {
        console.log("Current Restaurant: ", elem);
  
        // Check if elem has a category property and it's an array
        if (Array.isArray(elem.category)) {
          // Check if the selected category exists in the category array
          const foundCategory = elem.category.find(
            category => category && typeof category === 'string' && category.toLowerCase() === selectedCategory.toLowerCase()
          );
          return foundCategory !== undefined;
        }
  
        return false;
      });
  
      console.log("Filtered List: ", filteredList);
  
      setFilterData(filteredList);
    } else {
      console.log("No Category Selected. Displaying All Restaurants.");
      // If no category is selected, display all restaurants
      setFilterData(restaurant);
    }
  }, [selectedCategory, restaurant]);
  
  

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
        {
          filterData.map((rest) => (
            <View key={rest.id} >
              <RestaurantCard restaurant={rest} onPress={(restaurant) => handleButtonPress(restaurant)}/>
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
