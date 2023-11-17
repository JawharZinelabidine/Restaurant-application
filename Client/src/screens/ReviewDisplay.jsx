import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const ReviewDisplay = ({ review }) => {

  const size = review.size - 1


  return (
    <View style={styles.reviewContainer}>
      {review.title && (<View>
        <View style={styles.header}>
          <Text style={styles.reviewTitle}>Latest Review:</Text>
          <Text style={styles.reviewAmount}>{size > 1 ? `${size} more reviews` : size === 1 ? `${size} more review` : ''}</Text>
        </View>
        <View style={styles.cardRating}>
          <AntDesign name="star" size={20} color="gold" />
          <Text style={styles.cardRatingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewDetails}>
          <Text style={styles.reviewLabel}>Title:</Text>
          <Text style={styles.reviewText}>{review.title}</Text>
        </View>
        <View style={styles.reviewDetails}>
          <Text style={styles.reviewLabel}>Guest:</Text>
          <Text style={styles.reviewText}>{review.name}</Text>

        </View>
        <Text style={styles.reviewBody}>{review.body}</Text>
      </View>)}
      {!review.title && (<Text> No reviews yet for this restaurant
      </Text>)}

    </View>


  )
};

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 50,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  reviewAmount: {
    fontSize: 17,
    fontWeight: "400",
    marginBottom: 10,
  },
  reviewDetails: {
    flexDirection: "row",
    marginBottom: 5,
  },
  reviewLabel: {
    fontWeight: "500",
    marginRight: 5,
  },
  reviewText: {
    flex: 1,
  },
  reviewBody: {
    marginTop: 10,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 7,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6
  },
});

export default ReviewDisplay;
