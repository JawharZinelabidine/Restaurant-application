import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useRef } from "react";
import { Colors, Images } from "../contants";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding,
} from "../../GlobalStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import store from "../features/store";
import axios from "axios";
import ToastMessage from "../Component/ToastMessage";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
import { Display } from "../utils";

export default function RestaurantDetails({ route }) {
  const customer = store.getState().customer;

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
  const toastRef = useRef(null);


  const {
    name,
    description,
    menu_images,
    opening_time,
    closing_time,
    City,
    category,
    extra_images,
  } = route.params.restaurant;
  console.log(route.params.restaurant);
  const navigation = useNavigation();

  const hideDateTime = () => {
    setShowDateTime(false);
  };

  const makeReservation = async () => {
    try {
      const myReservation = await axios.post(
        `http://${apiUrl}:3000/api/reservations/${customer.id}/${id}`,
        reservation
      );
      console.log("Your reservation request was sent!", myReservation);
      setSpotsRemaining(`Your reservation request was sent!`);
      setShowToast2(true);
      if (toastRef.current) {
        toastRef.current.show();
      }

      setReservation({ date: "", time: "", guest_number: null });
      toggleForm();
    } catch (error) {
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
      if (error.response.status === 404) {
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

  const spaced = category.toString().split(",").join("  ");

  return (
    <View style={styles.ScreenContainer}>
      <View>
        <ScrollView horizontal={true}>
          {extra_images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.extraimage}
            
             
            />
          ))}
        </ScrollView>
        
      <View style={styles.dotsContainer}>
        {extra_images.map((_, index) => (
          <Text
            key={index}
            style={[
              styles.dot,
             
              
            ]}
          >
            </Text>
        ))}
        </View>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{`Rating: ${"4.0"}`}</Text>
        </View>
      </View>
      <TouchableOpacity
        title="Go Back"
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>
          <AntDesign name="left" size={24} color="white " />
        </Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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

        <Text style={styles.openingHours}>{` ${moment(opening_time).format(
          "LT"
        )} - ${moment(closing_time).format("LT")}`}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{spaced}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image source={Images.PINICON} style={styles.icon} />
          <Text style={styles.openingHours}>{City}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.reservationContainer}>
          <TouchableOpacity
            title="Make A reservation "
            style={styles.menuButton}
            onPress={toggleForm}
          >
            <Text style={styles.menuText}>Make a Reservation</Text>
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 150,
    paddingVertical: 100,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  reservationContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  inputControl: {
    height: 25,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderColor: Colors.DEFAULT_RED,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.DEFAULT_WHITE,
  },
  menuButton: {
    borderRadius: 16,
    backgroundColor: "#F00",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  backButton: {
    borderRadius: 16,
    backgroundColor: "#F00",
    paddingVertical: -15,
    paddingHorizontal: 12,
    width: 50,
    height: 50,
    top: -430,
    left: 10,
  },
  backText: {
    top: 15,
    color: "#FFF",
  },
  menuText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 24,
  },
  inputControlGuest: {
    height: 25,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderColor: Colors.DEFAULT_RED,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: "500",
    color: Colors.DARK_ONE,
  },
  ScrollViewFlex: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.DEFAULT_RED,
    margin: 5,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  ScreenContainer: {
    flex: 1,
    backgroundColor: "black",
  },

  extraimage: {
    width: Dimensions.get("window").width,
    height: 480,
  },
  name: {
    fontFamily: "Fakt Pro",
    fontSize: 32,
    fontWeight: "500",
    lineHeight: 40,
    color: "white",
  },
  category: {
    color: "black",
    paddingVertical: 6,
    fontSize: 14,
    display: "flex",
  },
  categoryContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    display: "flex",
  },
  description: {
    color: "gray",
  },
  menuImage: {
    height: 200,
    width: 200,
  },
  rating: {
    color: "gray",
  },
  ratingText: {
    color: "white",
  },
  ratingContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    paddingLeft: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  openingHours: {
    color: "white",
    paddingVertical: 4,
    fontSize: 16,
  },
  iconContainer: {
    height: 200,
    width: 500,
    margin: 30,
    padding: 30,
    display: "flex",
    borderRadius: 80,
  },
  icon: {
    width: 24,
    height: 24,
    marginTop: 8,
    marginLeft: -8,
  },

  selectValue: {
    color: "#6f7482",
    fontSize: 16,
    fontFamily: "IBMPlexSans-Regular",
  },
  selectLayout: {
    height: 68,
    width: 318,
    left: 44,
    position: "absolute",
  },
  confirmFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    top: 35,
  },
  textInput1: {
    top: 131,
    height: 73,
    width: 318,
    left: 44,
    position: "absolute",
  },
  select: {
    top: 231,
    overflow: "hidden",
  },
  confirm: {
    fontSize: FontSize.paragraphIBMPlexSansRegular_size,
    letterSpacing: -0.2,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Colors.DEFAULT_WHITE,
    textAlign: "center",
    display: "flex",
    width: 87,
  },
  confirmWrapper: {
    top: 340,
    left: 139,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorRed,
    width: 123,
    height: 55,
    flexDirection: "row",
    paddingHorizontal: Padding.p_119xl,
    paddingVertical: Padding.p_base,
    position: "absolute",
    alignItems: "center",
  },
  framePop: {
    backgroundColor: "#131313",
    width: 402,
    height: 423,
    overflow: "hidden",
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    fontSize: 24,
    marginHorizontal: 5,
    color: 'black', // Adjust the color of the dots
  },
})
