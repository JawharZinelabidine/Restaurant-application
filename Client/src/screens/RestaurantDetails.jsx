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
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { Display } from "../utils";
import ReviewDisplay from "./ReviewDisplay.jsx";
import ReviewModal from "./ReviewModal.jsx";
import { useEffect } from "react";
import RestaurantMap from "../Component/RestaurantMap.jsx";
import * as SecureStore from 'expo-secure-store';
import StarRating from 'react-native-star-rating-widget';

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
  const [customers, setCustomers] = useState([]);
  const [token, setToken] = useState('')

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
    main_image,
    menu_images,
    opening_time,
    closing_time,
    City,
    category,
    extra_images,
    rating,
    latitude,
    longtitude,
    accountType
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
        console.log(error.response.data.message)
        if (error.response.data.message === 'user already has a reservation on this date.') {
          setSpotsRemaining(
            `You already have made a reservation on this date.`
          );
        }
        else if (error.response.data > 1) {
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

  const getAllCustomers = async () => {
    try {

      const { data } = await regularAxios.get(`http://${apiUrl}:3000/api/customers`)
      setCustomers(data)


    } catch (error) {
      console.log(error)
    }

  }


  const highestReview = reviews.slice().reduce((max, review) =>
    review.rating > max.rating ? review : max, reviews[0]
  );

  const filteredReviews = reviews.filter(review => review.id !== highestReview.id);

  const lowestReview = filteredReviews.slice().reduce((min, review) =>
    review.rating < min.rating ? review : min, filteredReviews[0]
  );




  if (reviews.length <= 2) {

    var onlyCustomer = customers.slice().find((customer) => {
      return customer.id === reviews[0]?.customerId
    })

  }


  const size = reviews.length - 2


  if (highestReview) {

    var highestCustomer = customers.slice().find((customer) => {
      return customer.id === highestReview.customerId
    })

  }
  if (lowestReview) {

    var lowestCustomer = customers.slice().find((customer) => {
      return customer.id === lowestReview.customerId
    })

  }

  const getToken = async () => {

    const token = await SecureStore.getItemAsync('token')

    setToken(token)
  }


  const handleButtonPress = (conversation, restaurants, token) => {
    if (token) {
      navigation.navigate("Messages", { conversation, restaurants, token });
    }
    else if (!token) {

      setSpotsRemaining("You need to be logged in");
      setShowToast(true);
      if (toastRef.current) {
        toastRef.current.show();
      }
    }

  };

  const conversation = { restaurantId: id }
  const restaurants = [{ id: id, name: name, main_image: main_image }]



  useEffect(() => {

    getReviews()
    getAllCustomers()
    getToken()
  }, [])

  const spaced = category.toString().split(",").join("  ");

  return (
    <ScrollView style={styles.container}>


      <RestaurantDetailsSwiper extraImages={extra_images} />
      {showToast && (
        <ToastMessage
          ref={toastRef}
          type="danger"
          text={spotsRemaining}
          timeout={5000}
        />
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          <AntDesign name="left" size={24} color="white" />
        </Text>
      </TouchableOpacity>
      {accountType === 'PREMIUM' && (
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => handleButtonPress(conversation, restaurants, token)}
        >
          <AntDesign name="message1" size={35} color="white" />
        </TouchableOpacity>
      )}

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


          {!rating && (
            <View style={styles.cardRating}>
              <StarRating
                rating={rating} starSize={50} maxStars={1} onChange={() => { return }} enableSwiping={false} />
              <Text style={styles.cardRatingText}>{rating ? rating : 'Not rated'}</Text>
            </View>
          )}
          {rating > 0 && (
            <View style={styles.cardRating}>
              <StarRating
                rating={rating} starSize={50} enableHalfStar={true} starStyle={{ width: 30 }} onChange={() => { return }} enableSwiping={false} />
            </View>
          )}
          <Text style={styles.openingHours}>{`${moment(opening_time).utcOffset("-000").format("LT")} - ${moment(closing_time).utcOffset("-000").format("LT")}`}</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{spaced}</Text>
          </View>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" style={styles.icon} color={"red"} />
            <Text style={styles.city}>{City}</Text>
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
        {reviews.length > 2 && (
          <View style={{ display: 'flex', flexDirection: 'column', marginTop: 50 }}>
            <ReviewDisplay
              review={{
                title: highestReview?.review_title,
                name: highestCustomer?.fullname,
                image: highestCustomer?.profilePic,
                body: highestReview?.review_body,
                rating: highestReview?.rating,
              }}
            />
            <ReviewDisplay
              review={{
                title: lowestReview?.review_title,
                name: lowestCustomer?.fullname,
                image: lowestCustomer?.profilePic,
                body: lowestReview?.review_body,
                rating: lowestReview?.rating,
              }}



            />
            <TouchableOpacity onPress={toggleReviewModal}>

              <Text style={styles.reviewAmount}>
                {size > 1 ? `See ${size} more reviews!` : size === 1 ? `See ${size} more review!` : ''}
              </Text>
            </TouchableOpacity>

          </View>
        )}

        {reviews.length === 2 && (
          <View style={{ display: 'flex', flexDirection: 'column', marginTop: 50, gap: 10 }}>
            <ReviewDisplay
              review={{
                title: highestReview?.review_title,
                name: highestCustomer?.fullname,
                image: highestCustomer?.profilePic,
                body: highestReview?.review_body,
                rating: highestReview?.rating,
              }}
            />
            <ReviewDisplay
              review={{
                title: lowestReview?.review_title,
                name: lowestCustomer?.fullname,
                image: lowestCustomer?.profilePic,
                body: lowestReview?.review_body,
                rating: lowestReview?.rating,
              }}
            />
          </View>
        )}
        {reviews.length < 2 && (
          <View style={{ display: 'flex', flexDirection: 'column', marginTop: 50 }}>
            <ReviewDisplay
              review={{
                title: reviews[0]?.review_title,
                name: onlyCustomer?.fullname,
                image: onlyCustomer?.profilePic,
                body: reviews[0]?.review_body,
                rating: reviews[0]?.rating,
              }}
            />
          </View>
        )}



        <View style={styles.map} >
          <RestaurantMap latitude={latitude} longitude={longtitude} />
        </View>
        <View style={styles.topedite}></View>
      </ScrollView>
      {isModalOpen && (
        <TouchableWithoutFeedback>
          <Modal transparent={true} visible={true} >
            <Pressable
              style={{ backgroundColor: "#000000aa", flex: 1 }}
              onPress={toggleForm}
            >
              {showToast && (
                <ToastMessage
                  ref={toastRef}
                  type="danger"
                  text={spotsRemaining}
                  timeout={5000}
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
                onPress={setIsModalOpen}
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
                  returnKeyType="done"
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
        customers={customers}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  reviewAmount: {
    fontSize: 17,
    fontWeight: "400",
    marginTop: 10,
    alignSelf: 'flex-start'
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
    right: 10

  },
  category: {
    color: "#333",
    fontSize: 16,
    fontWeight: '500',

  },
  openingHours: {
    bottom: 20,
    fontWeight: 'bold'

  },
  city: {

    fontWeight: 'bold'

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
    color: "white",
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
    justifyContent: 'flex-start'
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
  chatButton: {
    borderRadius: 8,
    backgroundColor: 'rgba(1, 1, 1, 0.3)',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 3,
    width: 55,
    height: 50,
    position: "absolute",
    top: 50,
    left: 340,
  },
  chatText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
  icon: {
    width: 20,
    height: 34,
    marginTop: 8,
    fontSize: 20
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
    bottom: 20,
    right: 13

  },
  map: {
    width: '100%',
    marginTop: "20%",
  }
});
