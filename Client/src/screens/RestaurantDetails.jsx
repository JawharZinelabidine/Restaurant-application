import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import RestaurantDetailsSwiper from "../navigators/RestaurantDetailsSwiper";

import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useRef } from "react";
import { Colors, Images } from "../contants";
import store from "../features/store";
import axios from "../../services/axiosInterceptor.jsx";
import regularAxios from "axios";
import ToastMessage from "../Component/ToastMessage";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { Display } from "../utils";
import ReviewDisplay from "./ReviewDisplay.jsx";
import ReviewModal from "./ReviewModal.jsx";
import { useEffect } from "react";

export default function RestaurantDetails({ route }) {
  const customer = store.getState().customer;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [showForm, setShowForm] = useState(false);

  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    guest_number: null,
  });
  const [mode, setMode] = useState("date");
  const [showDateTime, setShowDateTime] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [spotsRemaining, setSpotsRemaining] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const toastRef = useRef(null);

  const toggleReviewModal = () => {
    if (reviews.length > 0) {
      console.log('a')
      setIsReviewModalOpen(!isReviewModalOpen);
    }
  };

  const {
    id,
    name,
    description,
    menu_images,
    opening_time,
    closing_time,
    City,
    category,
    extra_images,
    rating
  } = route.params.restaurant;
  const navigation = useNavigation();

  const hideDateTime = () => {
    setShowDateTime(false);
  };

  const makeReservation = async () => {
    try {
      const myReservation = await axios.post(
        `http://${apiUrl}:3000/api/reservations/${id}`,
        reservation
      );
      console.log("Your reservation request was sent!");
      setSpotsRemaining(`Your reservation request was sent!`);
      setShowToast2(true);
      if (toastRef.current) {
        toastRef.current.show();
      }

      setReservation({ date: "", time: "", guest_number: null });
      toggleForm();
    } catch (error) {
      console.log(error);
      console.log("Couldn't send reservation request :(", error);
      if (error.response.status === 400) {
        if (error.response.data > 1) {
          setSpotsRemaining(
            `This date only has ${error.response.data} reservation spots remaining`
          );
        } else if (error.response.data === 1) {
          setSpotsRemaining(
            `This date only has ${error.response.data} reservation spot remaining`
          );
        } else if (error.response.data === 0) {
          setSpotsRemaining(`This date has no reservation spots remaning`);
        }

        setShowToast(true);
        if (toastRef.current) {
          toastRef.current.show();
        }
      }
      if (error.response.status === 422) {
        setSpotsRemaining("Reservation info missing");
        setShowToast(true);
        if (toastRef.current) {
          toastRef.current.show();
        }
      }
      if (error.response.status === 401) {
        setSpotsRemaining("You need to be logged in");
        setShowToast(true);
        if (toastRef.current) {
          toastRef.current.show();
        }
      }
    }
  };

  const handleDateChange = (event, selectedDate) => {
    let currentDate = selectedDate || "";

    if (mode === "date") {
      currentDate = currentDate.toISOString().slice(0, 10);
    }

    if (event.type === "set") {
      console.log("Selected date:", currentDate);
      setReservation((inputs) => ({ ...inputs, [mode]: currentDate }));
      hideDateTime();
    } else hideDateTime();
  };

  const handleChange = (name, value) => {
    setReservation((inputs) => ({ ...inputs, [name]: value }));
  };

  const toggleForm = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDateTime = (mode) => {
    setMode(mode);
    setShowDateTime(true);
  };


  const getReviews = async () => {
    try {
      const { data } = await regularAxios.get(`http://${apiUrl}:3000/api/reviews/${id}`)
      setReviews(data)

    } catch (error) {
      console.log(error)

    }
  }
  const latestReview = reviews.reduce((max, review) =>
    review.createdAt > max.createdAt ? review : max, reviews[0]
  );


  useEffect(() => {

    getReviews()

  }, [])

  const spaced = category.toString().split(",").join("  ");

  return (
    <View style={styles.container}>
      <RestaurantDetailsSwiper extraImages={extra_images} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          <AntDesign name="left" size={24} color="white" />
        </Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>

            <Text style={styles.name}>{name}</Text>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() =>
                navigation.navigate("MenuContainer", {
                  menuImages: menu_images,
                })
              }
            >
              <Text style={styles.menuText}>Menu</Text>
            </TouchableOpacity>

          </View>
          <View style={styles.cardRating}>
            <AntDesign name="star" size={30} color="gold" />
            <Text style={styles.cardRatingText}>{rating ? rating : 4.5}</Text>
          </View>
          <Text style={styles.openingHours}>{`${moment(opening_time).format(
            "LT"
          )} - ${moment(closing_time).format("LT")}`}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{spaced}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Image source={Images.PINICON} style={styles.icon} />
            <Text style={styles.openingHours}>{City}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>

        <TouchableOpacity
          title="Make A reservation "
          style={styles.menuButton}
          onPress={toggleForm}
        >
          <Text style={styles.menuText}>Make a Reservation</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={toggleReviewModal}>
          <ReviewDisplay
            review={{
              title: latestReview?.review_title,
              name: "John Doe",
              body: latestReview?.review_body,
              rating: latestReview?.rating,
              size: reviews?.length
            }}
          />
        </TouchableOpacity>
        <View style={styles.topedite}></View>
      </ScrollView>
      {isModalOpen && (
        <TouchableWithoutFeedback onPress={toggleForm}>
          <Modal transparent={true} visible={true} onPress={toggleForm}>
            <Pressable
              style={{ backgroundColor: "#000000aa", flex: 1 }}
              onPress={toggleForm}
            >
              {showToast && (
                <ToastMessage
                  ref={toastRef}
                  type="danger"
                  text={spotsRemaining}
                  timeout={3000}
                />
              )}

              <View
                style={{
                  backgroundColor: Colors.DARK_ONE,
                  margin: 20,
                  padding: 40,
                  borderRadius: 10,
                  top: 250,
                  height: 350,
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    toggleDateTime("date");
                  }}
                >
                  <Text style={styles.btnText}>Date</Text>
                </Pressable>
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    toggleDateTime("time");
                  }}
                >
                  <Text style={styles.btnText}>Time</Text>
                </Pressable>

                {showDateTime && (
                  <DateTimePicker
                    mode={mode}
                    value={new Date(Date.now())}
                    is24Hour={true}
                    confirmBtnText="Confirm"
                    display="default"
                    minimumDate={new Date()}
                    timeZoneName={"Africa/Tunis"}
                    timeZoneOffsetInMinutes={0}
                    onChange={handleDateChange}
                  />
                )}
                <Text style={{ fontSize: 25, color: "#ffffff" }}>Guests</Text>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange("guest_number", +text)}
                  style={styles.inputControlGuest}
                />

                <Pressable style={styles.btn} onPress={makeReservation}>
                  <Text style={styles.btnText}>Submit</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>

        </TouchableWithoutFeedback>
      )}

      <ReviewModal
        isVisible={isReviewModalOpen}
        onClose={toggleReviewModal}
        reviews={reviews}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 0,
  },
  imageSwiper: {
    height: Display.setHeight(100),
  },
  backButton: {
    borderRadius: 8,
    backgroundColor: "#F00",
    padding: 12,
    width: 50,
    height: 50,
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  name: {
    fontSize: 36,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  category: {
    color: "#333",
    fontSize: 16,
  },
  description: {
    color: "#666",
    marginBottom: 16,
  },
  reservationButton: {
    backgroundColor: "red",
    alignItems: "center",
  },
  reservationButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  modalContainer: {
    backgroundColor: "#333",
    margin: 20,
    padding: 24,
    borderRadius: 10,
    alignItems: "center",
  },
  btn: {
    borderRadius: 8,
    backgroundColor: "#F00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  inputControlGuest: {
    height: 40,
    backgroundColor: "black",
    borderColor: "#F00",
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
    borderRadius: 8,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
    margin: 5

  },
  detailsContainer: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  reservationButtonText: {
    color: "white",
    fontWeight: "700",
  },
  menuButton: {
    borderRadius: 16,
    backgroundColor: "#F00",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  menuText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
  icon: {
    width: 40,
    height: 40,
    marginTop: 8,
  },
  topedite: {
    marginTop: 100,

  },
  cardRatingText: {
    color: 'gray',
    fontSize: 20

  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 18,

  },
});
