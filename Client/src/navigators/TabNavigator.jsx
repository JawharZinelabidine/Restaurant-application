
import React, { useEffect } from "react";
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Homescreen, ReservationListScreen, MessagesScreen, LoginScreen } from '../screens'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from "../contants";
import { BlurView } from '@react-native-community/blur'
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Notifications from 'expo-notifications';
import store from "../features/store";
import { setNotificationBadge, setNotificationBody, setToast } from '../../src/features/notificationSlice';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,

    }),
});


const notificationService = {
    handleNotification: (notification) => {
        console.log('Notification received');
        store.dispatch(setToast(true))
        store.dispatch(setNotificationBadge(true))

    },
};



const Tab = createBottomTabNavigator()

const TabNavigator = () => {


    const isFocused = useIsFocused();

    const { notificationBadge } = useSelector(state => state.notification);

    useEffect(() => {
        if (isFocused) {
            const subscription = Notifications.addNotificationReceivedListener(
                notificationService.handleNotification

            );

            return () => {
                subscription.remove();
            };

        }
    }, [isFocused])


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
            <Tab.Screen name={"LoginScreen"} component={LoginScreen} options={{

                tabBarIcon: ({ focused, color, size }) => (
                    <AntDesign name="login" size={24} color={focused ? Colors.DEFAULT_RED : "black"} />

                )
            }} ></Tab.Screen>

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
