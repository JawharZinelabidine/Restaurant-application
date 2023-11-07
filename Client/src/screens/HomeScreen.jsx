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

export default function HomeScreen({ navigation, route }) {
  const category = ["Italian", "Tunisian", "Japanese", "Lebanese", "Steakhouse", "Breakfast", "Mexican", "French"];

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const isFocused = useIsFocused();

  const [restaurant, setRestaurant] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const[searchTerm,setSearchTerm]=useState("");
  const[filterData,setFilterData]=useState([]);

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
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
      </View>

      <View>
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
      </View>
      <ScrollView vertical>
        {
          filterData.map((rest) => (
            <View key={rest.id} >
              <RestaurantCard restaurant={rest} onPress={(restaurant) => handleButtonPress(restaurant)}/>
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
    paddingBottom: 2, 
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
    padding: 3,
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