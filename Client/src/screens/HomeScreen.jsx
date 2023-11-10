import React, { useState } from "react";
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "../Component/RestaurantCard";
import { useEffect, useRef } from "react";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios'
import { View, Text, StyleSheet, ScrollView, Modal } from "react-native";
import HeaderBar from "./HeaderBar";
import SearchBar from "../Component/SearchBar";
import Categorys from "../Component/Categorys";
import ToastMessage from "../Component/ToastMessage";
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen({ navigation, route }) {

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const isFocused = useIsFocused();
  const toastRef = useRef(null);
  const { toast } = useSelector(state => state.notification);
  const { id } = useSelector(state => state.customer);

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



  if (toast && id) {
    if (toastRef.current) {
      toastRef.current.show()
    }
  }






  useEffect(() => {
    if (isFocused) {
      fetchData()

    }


  }, [isFocused])


  const handleButtonPress = (restaurant) => {
    navigation.navigate("RestaurantDetails", { restaurant });
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
        {toast && (

          <ToastMessage
            ref={toastRef}
            type="info"
            text='There has been an update to one of your reservations!'
            timeout={4000}
          />
        )}

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
    marginBottom: -50,
  },
  categorySearchContainer: {
    flexDirection: "column",
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
    maxHeight: 40
  },// Add some spacing between categories
  topedite: {
    marginTop: 100,

  },
});