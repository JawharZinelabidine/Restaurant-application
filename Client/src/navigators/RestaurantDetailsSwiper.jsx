import React from "react";
import { Image, View } from "react-native";
import Swiper from 'react-native-swiper';
import { Display } from "../utils";

const RestaurantDetailsSwiper = ({ extraImages }) => {
  if (!extraImages || extraImages.length === 0) {
    return (
      <Image source={{}} style={{ height: Display.setHeight(50), width: Display.setWidth(50) }} />
    );
  }
  return (
    <View style={{ height: Display.setHeight(50) }}>
      <Swiper showsButtons={false} showsPagination={true} >
        {extraImages.map((imageUri, index) => (
          <Image key={index} source={{ uri: imageUri }} style={{ height: Display.setHeight(50), width: Display.setWidth(100) }} />
        ))}
      </Swiper>

    </View>

  );
};

export default RestaurantDetailsSwiper;