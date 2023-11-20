import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Display, calculateDistance } from "../utils";
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";





export default function RestaurantCard({ restaurant, onPress }) {
  const { name, main_image, opening_time, closing_time, category, rating, latitude, longtitude, accountType } = restaurant;
  const { lat, lng } = useSelector(state => state.customer)
  const handleButtonPress = () => {
    onPress(restaurant);
  };

  const spaced = category.toString().split(',').join('  ');
  let formattedDistance = null;
  if (lat && lng) {
    const distance = calculateDistance(lat, lng, latitude, longtitude);
    formattedDistance = distance < 1 ? `${Math.round(distance * 1000)} m away` : `${distance.toFixed(0)} kilometers away`;
  }

  const now = moment().utcOffset("120");
  const open = moment(opening_time).utcOffset("120");
  const close = moment(closing_time).utcOffset("120");

  const isOpen = (openingTime, closingTime) => {
    const currentTime = moment(now).format('HH:mm');
    const opening = moment(openingTime).format('HH:mm');
    const closing = moment(closingTime).format('HH:mm');
    if (closing >= opening) {
      return currentTime >= opening && currentTime <= closing;
    } else {
      return currentTime >= opening || currentTime <= closing;
    }
  };



  const isCurrentlyOpen = isOpen(open, close);

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <View style={styles.cardContainer}>
        <Image source={{ uri: main_image.trim() }} style={styles.cardImage} />
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardCategory}>{spaced}</Text>
        {formattedDistance && <Text style={styles.cardDistance}>{formattedDistance}</Text>}
        <View style={styles.cardRating}>
          <AntDesign name="star" size={20} color="gold" />
          <Text style={styles.cardRatingText}>{rating ? rating : 'Not rated'}</Text>
        </View>
        <View style={styles.cardStatus}>
          <AntDesign name="clockcircle" size={14} color={isCurrentlyOpen ? "green" : "red"} />
          <Text style={isCurrentlyOpen ? styles.cardOpen : styles.cardClosed}>{isCurrentlyOpen ? 'Open' : 'Closed'}</Text>
        </View>
      </View>
      {accountType === 'PREMIUM' && (<AntDesign name="message1" size={24} style={styles.chatSign} />
      )}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    borderColor: "gray",

    shadowColor: "black", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.6, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // Android elevation (elevates the view)
  },
  cardImage: {
    height: Display.setHeight(30),
    width: Display.setWidth(90),
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
    top: 5

  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20
  },

  cardRatingText: {
    color: 'gray',
    marginLeft: 5,
  },
  cardStatus: {
    flexDirection: 'row',
    left: 300,
  },
  cardOpen: {
    color: 'green',
    fontSize: 16,
    bottom: 5,
    marginLeft: 5
  },
  cardClosed: {
    color: 'red',
    fontSize: 16,
    bottom: 5,
    marginLeft: 5
  },
  cardDistance: {
    color: 'gray',
    fontSize: 14,
    top: 10,
  },
  chatSign: {
    left: 350,
    bottom: 120,

  }
});
