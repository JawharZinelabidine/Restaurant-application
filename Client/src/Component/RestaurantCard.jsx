import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Display, calculateDistance } from "../utils";
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import moment from "moment";
import StarRating from 'react-native-star-rating-widget';





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

    formattedDistance = distance < 1 ? `${Math.round(distance * 1000)} meters away` : distance > 0 && distance < 2 ? `${distance.toFixed(0)} kilometer away` : `${distance.toFixed(0)} kilometers away`;
  }

  const now = moment().utcOffset("120");
  const open = moment(opening_time);
  const close = moment(closing_time);

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

        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{name}</Text>
          {accountType === 'PREMIUM' && (
            <AntDesign name="message1" size={24} style={styles.chatSign} />

          )}
        </View>
        {!rating && (
          <View style={styles.cardNoRating}>
            <StarRating
              rating={rating} starSize={22} maxStars={1} onChange={() => { return }} enableSwiping={false} />
            <Text style={styles.cardRatingText}>{rating ? rating : 'Not rated'}</Text>
          </View>
        )}
        {rating > 0 && (
          <View style={styles.cardRating}>
            <StarRating
              rating={rating} starSize={22} enableHalfStar={true} starStyle={{ width: 10 }} onChange={() => { return }} enableSwiping={false} />
          </View>
        )}
        <Text style={styles.cardCategory}>{spaced}</Text>
        {formattedDistance && <Text style={styles.cardDistance}>{formattedDistance}</Text>}


        <View style={styles.cardStatus}>
          <AntDesign name="clockcircle" size={14} color={isCurrentlyOpen ? "green" : "red"} />
          <Text style={isCurrentlyOpen ? styles.cardOpen : styles.cardClosed}>{isCurrentlyOpen ? 'Open' : 'Closed'}</Text>
        </View>
      </View>


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
    top: 5,


  },
  cardNoRating: {
    flexDirection: 'row',
    right: 9,
  },
  cardRating: {
    flexDirection: 'row',
    right: 9,
  },

  cardRatingText: {
    color: 'gray',

  },
  cardStatus: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
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
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  chatSign: {
    marginTop: 10,


  }
});
