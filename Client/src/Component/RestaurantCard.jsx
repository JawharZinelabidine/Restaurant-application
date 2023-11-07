import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Display } from "../utils";

import Icon from 'react-native-vector-icons/FontAwesome';

export default function RestaurantCard({ restaurant, onPress }) {
  const { name, main_image, category, opening_time, closing_time, rating, status, City } = restaurant;

  const handleButtonPress = () => {
    onPress(restaurant);
  };

  const spaced = category.toString().split(',').join('  ');

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: main_image.trim() }} style={styles.cardImage} />
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardCategory}>{spaced}</Text>
        <View style={styles.cardRating}>
          <Icon name="star" size={15} color="#dea84a" />
          <Text style={styles.cardRatingText}>4.5</Text>
        </View>
        <Text style={styles.cardStatus}>Open</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  cardImage: {
    height: Display.setHeight(30),
    width: Display.setWidth(88),
    borderRadius: 10,
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardCategory: {
    color: 'gray',
    fontSize: 14,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRatingText: {
    color: 'gray',
    marginLeft: 5,
  },
  cardOpeningHours: {
    color: 'gray',
    fontSize: 14,
  },
  cardStatus: {
    color: 'green',
    fontSize: 16,
  },
});
