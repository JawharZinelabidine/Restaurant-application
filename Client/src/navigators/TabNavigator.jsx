
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Homescreen, ReservationListScreen, MessagesScreen, LoginScreen, ReviewForm, ReservationReviews } from '../screens'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Colors } from "../contants";
import { BlurView } from '@react-native-community/blur'
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import * as Notifications from 'expo-notifications';
import store from "../features/store";
import { setNotificationBadge, setToast, setReviewNotificationBadge } from '../../src/features/notificationSlice';
import axios from '../../services/axiosInterceptor.jsx';
import * as SecureStore from 'expo-secure-store';


const apiUrl = process.env.EXPO_PUBLIC_API_URL;


const checkNotification = async () => {
  try {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      const { data } = await axios.get(`http://${apiUrl}:3000/api/customers/notification`)
      store.dispatch(setNotificationBadge(data))

    }
  } catch (error) {
    console.log(error)
  }
}

const checkReview = async (id) => {
  try {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      const { data } = await axios.get(`http://${apiUrl}:3000/api/reservations/notification/${id}`)
      store.dispatch(setReviewNotificationBadge(data.notification))
    }
  } catch (error) {
    console.log(error)
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,

  }),
});

const notificationService = {
  handleNotification: (notification) => {
    store.dispatch(setToast(true))

    if (notification.request.content.data.route === 'ReservationReviews') {
      const id = notification.request.content.data.id
      checkReview(id)
    }
    if (notification.request.content.data.route === 'Reservation' || notification.request.content.data.route === 'History') {

      checkNotification()
    }


  },
};

const notificationResponseService = {
  handleNotificationResponse: (response, navigation) => {
    console.log('Notification response received');

    const route = response.notification.request.content.data.route

    navigation.navigate(route);

  },
};



const Tab = createBottomTabNavigator()

const TabNavigator = ({ navigation }) => {


  const isFocused = useIsFocused();



  const { notificationBadge, reviewNotificationBadge } = useSelector(state => state.notification);


  const { loggedin } = useSelector(state => state.loggedin);

  useEffect(() => {


    Notifications.addNotificationReceivedListener(
      notificationService.handleNotification


    );

    const notificationResponseSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => notificationResponseService.handleNotificationResponse(response, navigation)
    );

    return () => {
      notificationResponseSubscription.remove();
    };




  }, [])

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,


        topBarBackground: () => (
          <BlurView overlayColor='' blurAmount={15} style={styles.BlurViewStyles} />
        )
      }}>


      <Tab.Screen name="Home" component={Homescreen} options={{
        tabBarIcon: ({ focused, color, size }) => (

          <AntDesign name="home" size={24} color={focused ? Colors.DEFAULT_RED : "black"} style={styles.Home} />

        ),

      }}></Tab.Screen>

      <Tab.Screen name="Reservation" component={ReservationListScreen}

        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="calendar" size={24} color={focused ? Colors.DEFAULT_RED : "black"} />


          ),


          tabBarBadge: false,
          tabBarBadgeStyle: {
            backgroundColor: notificationBadge === true ? "red" : "transparent",
            top: 19,
            right: 7,
            maxWidth: 15,
            maxHeight: 15,
            fontSize: 8,
            lineHeight: 9,
            alignSelf: undefined,
          }


        }} ></Tab.Screen>
      <Tab.Screen name="Messages" component={MessagesScreen} options={{

        tabBarIcon: ({ focused, color, size }) => (
          <AntDesign name="message1" size={24} color={focused ? Colors.DEFAULT_RED : "black"} />
        )
      }}></Tab.Screen>
      <Tab.Screen name={"ReservationReviews"} component={ReservationReviews} options={{

        tabBarIcon: ({ focused, color, size }) => (
          <AntDesign name="staro" size={24} color={focused ? Colors.DEFAULT_RED : "black"} />

        ),
        tabBarBadge: false,
        tabBarBadgeStyle: {
          backgroundColor: reviewNotificationBadge === true ? "red" : "transparent",
          top: 19,
          right: 7,
          maxWidth: 15,
          maxHeight: 15,
          fontSize: 8,
          lineHeight: 9,
          alignSelf: undefined,
        }
      }} ></Tab.Screen>
      <Tab.Screen
        name={'Login'}
        component={LoginScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name={loggedin ? 'logout' : 'login'} size={24} color={loggedin ? Colors.DEFAULT_RED : 'green'} />
          ),
        }}
      ></Tab.Screen>

    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({

  tabBarStyle: {
    height: 70,
    position: 'absolute',
    backgroundColor: "#C3C6D1",
    borderTopWidth: 1,
    borderTopColor: "transparent",
    elevation: 0,
    borderTopColor: 'transparent'
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  notificationOn: {
    top: 15,
    backgroundColor: "red"
  },
  notificationOff: {
    top: 15,
    backgroundColor: "transparent"
  }

})