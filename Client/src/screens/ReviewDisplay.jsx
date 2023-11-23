import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';


const ReviewDisplay = ({ review }) => {


  const altProfileImage = require('../assets/images/icons8-customer-50.png')

  return (
    <View style={styles.reviewContainer}>
      {review.title && (<View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.reviewDetails}>
            <Image
              source={review.image ? review.image : altProfileImage}
              style={styles.myImage} />
            <Text style={{ fontWeight: '500' }}>{review.name}</Text>

          </View>
          <View style={styles.cardRating}>
            <StarRating
              rating={review.rating} starSize={30} enableHalfStar={true} starStyle={{ width: 15 }}
              onChange={() => { return }} enableSwiping={false} />
          </View>
        </View>


        <View style={styles.reviewDetails}>
          <Text style={styles.reviewLabel}>Title:</Text>
          <Text >{review.title}</Text>
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
  myImage: {
    width: 25,
    height: 25,
    borderRadius: 16,
    marginRight: 5
  },
});

export default ReviewDisplay;
