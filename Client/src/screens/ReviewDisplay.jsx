import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
const ReviewDisplay = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewTitle}>Latest Review</Text>
      <View style={styles.reviewDetails}>
        <Text style={styles.reviewLabel}>Title:</Text>
        <Text style={styles.reviewText}>{review.title}</Text>
      </View>
      <View style={styles.reviewDetails}>
        <Text style={styles.reviewLabel}>Customer:</Text>
        <Text style={styles.reviewText}>{review.name}</Text>
        <View style={styles.cardRating}>
          <AntDesign name="star" size={20} color="gold" />
          <Text style={styles.cardRatingText}>4.5</Text>
        </View>
      </View>
      <Text style={styles.reviewBody}>{review.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 20,
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
    top: 15,
    right: 305
  },
});

export default ReviewDisplay;
