import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../contants";
import { Color, FontSize, Border } from "../../GlobalStyles";
import { Display } from "../utils";
import moment from "moment";
import React from "react";

const UpcomingList = ({ reservation, restaurants }) => {
  const restaurantName = restaurants.slice().find((restaurant) => {
    return restaurant.id === reservation.restaurantId;
  });

  return (
    <>
      <LinearGradient
        style={[styles.rectangleLineargradient, styles.groupIconLayout]}
        locations={[0, 1]}
        colors={["#000", "rgba(0, 0, 0, 0)"]}
      />

      <View
        style={[
          reservation.status === "Pending"
            ? styles.rectangleViewPending
            : reservation.status === "Approved"
              ? styles.rectangleViewApproved
              : null,
          styles.iphone131412ChildLayout1,
        ]}
      />
      <Text
        style={[
          reservation.status === "Pending"
            ? styles.pending
            : reservation.status === "Approved"
              ? styles.accepted
              : null,
          styles.rosemarysTypo,
        ]}
      >
        {reservation.status}
      </Text>
      <Text style={[styles.rosemarys, styles.rosemarysLayout]}>
        {restaurantName?.name}
      </Text>
      <Text style={[styles.text, styles.textPosition]}>
        {moment(reservation.date).format("MMM Do YY")}
      </Text>
      <Text style={[styles.pm, styles.rosemarysTypo]}>
        {moment(reservation.time).utcOffset("-000").format("LT")}
      </Text>
    </>
  );
};

export default UpcomingList;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 5,
    padding: 2,
    width: Display.setWidth(90),
    marginBottom: 100, // Adjust as needed
    // Other card styles
  },

  historyTypo: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: Color.colorWhite,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: -0.2,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
    position: "absolute",
  },
  groupIconLayout: {
    height: 93,
    position: "absolute",
  },
  iphone131412ChildLayout1: {
    height: 56,
    width: 6,
    borderBottomRightRadius: Border.br_6xl,
    borderTopRightRadius: Border.br_6xl,
  },
  iphone131412ChildLayout: {
    height: 94,
    width: 388,
    backgroundColor: "transparent",
  },
  rosemarysTypo: {
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  rosemarysLayout: {
    height: 29,
    width: 149,
    fontSize: FontSize.size_6xl,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
  },
  textPosition: {
    left: 22,
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  pm1Typo: {
    top: 341,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
    position: "absolute",
  },
  iphone131412ChildPosition: {
    left: 2,
    position: "absolute",
  },
  text2Position: {
    left: 21,
    position: "absolute",
  },
  pm2Typo: {
    top: 238,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
  },
  iphone131412Child: {
    top: -13,
    left: -6,
    width: 396,
    height: 799,
    backgroundColor: "transparent",
    position: "absolute",
  },
  history: {
    top: 45,
    left: 238,
    width: 122,
    height: 31,
  },
  upcoming: {
    top: 45,
    width: 129,
    height: 41,
    left: 25,
  },
  iphone131412Item: {
    top: 30,
    left: 198,
    width: 1,
    height: 68,
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  iphone131412Inner: {
    marginLeft: -210,
    top: 90,
    height: 1,
    width: 388,
    left: "50%",
    position: "absolute",
    backgroundColor: Color.colorWhite,
  },
  iphone1312ProMax44: {
    top: -160,
    left: -519,
    width: 428,
    height: 971,
    position: "absolute",
  },
  rectangleLineargradient: {
    top: 92,
    left: 0,
    width: 388,
    backgroundColor: "transparent",
  },
  rectangleViewApproved: {
    top: 114,
    backgroundColor: "#4bc06c",
    left: 1,
    position: "absolute",
  },
  rectangleViewPending: {
    top: 114,
    backgroundColor: "#d3d71e",
    left: 1,
    position: "absolute",
  },
  iphone131412Child1: {
    top: 292,
    left: 1,
    position: "absolute",
  },
  iphone131412Child2: {
    top: 305,
    backgroundColor: "#5fb542",
    left: 0,
    position: "absolute",
  },
  pending: {
    top: 120,
    color: "#c0b54b",
    left: 290,
    lineHeight: 20,
  },
  accepted: {
    top: 120,
    color: "#4bc06c",
    left: 290,
    lineHeight: 20,
  },
  rosemarys: {
    top: 105,
    left: 23,
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  rosemarys1: {
    top: 302,
    height: 29,
    width: 149,
    fontSize: FontSize.size_6xl,
    alignItems: "center",
    display: "flex",
    color: Color.colorWhite,
  },
  text: {
    top: 144,
    color: Colors.DEFAULT_WHITE,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
  },
  pm: {
    top: 144,
    left: 151,
    color: Colors.DEFAULT_WHITE,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
  },
  text1: {
    left: 17,
    color: Color.colorDarkgray_100,
  },
  pm1: {
    left: 129,
    color: Color.colorDarkgray_200,
  },
  iphone131412Child3: {
    top: 191,
    height: 94,
    width: 388,
    backgroundColor: "transparent",
  },
  iphone131412Child4: {
    top: 214,
    backgroundColor: "#ff002e",
    height: 56,
    width: 6,
    borderBottomRightRadius: Border.br_6xl,
    borderTopRightRadius: Border.br_6xl,
  },
  declined: {
    top: 224,
    color: "#c04b4b",
    fontSize: FontSize.size_lg,
    left: 290,
    lineHeight: 20,
  },
  rosemarys2: {
    top: 199,
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
    left: 25,
  },
  text2: {
    top: 238,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
    color: Color.colorDarkgray_100,
  },
  pm2: {
    left: 127,
    color: Color.colorDarkgray_200,
    position: "absolute",
  },
  groupIcon: {
    marginLeft: -195,
    top: 782,
    width: 390,
    left: "50%",
  },
  homeIcon: {
    top: 807,
    width: 24,
    height: 24,
  },
  iphone131412: {
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    backgroundColor: Color.colorWhite,
  },
});
