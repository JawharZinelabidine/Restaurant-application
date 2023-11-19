import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize } from "../../GlobalStyles";
import React from 'react'
import { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor';


const ConversationList = ({ conversation, restaurants, onPress }) => {


    const [messages, setMessages] = useState([])


    const apiUrl = process.env.EXPO_PUBLIC_API_URL;


    const handleButtonPress = () => {
        onPress(conversation);
    };

    const getMessages = async () => {
        try {

            const { data } = await axios.get(`http://${apiUrl}:3000/api/messages/customer/messages/${conversation.restaurantId}`)
            setMessages(data)
        } catch (error) {
            console.log(error)
            if (error && error.response.status === 403 || error && error.response.status === 401) {
                await SecureStore.deleteItemAsync('token')
                navigation.navigate('LoginScreen')
            }
        }

    }

    const restaurantName = restaurants.slice().find((restaurant) => {
        return restaurant.id === conversation.restaurantId
    })




    useEffect(() => {
        getMessages()
    }, [])


    return (


        <TouchableOpacity onPress={handleButtonPress}>

            <LinearGradient
                style={[styles.rectangleLineargradient, styles.groupIconLayout]}
                locations={[0, 1]}
                colors={["#000", "rgba(0, 0, 0, 0)"]}
            />
            <Text style={[styles.restaurantName, styles.restaurantNameLayout]}>{restaurantName?.name}</Text>
            <Text style={[styles.lastMessage, styles.lastMessageLayout]}>{messages[messages.length - 1].message}</Text>



        </TouchableOpacity>


    )
}

export default ConversationList



const styles = StyleSheet.create({


    rectangleLineargradient: {
        top: 92,
        left: 0,
        width: 388,
        backgroundColor: "transparent",

    },
    groupIconLayout: {
        height: 93,
        position: "absolute",
    },


    restaurantName: {
        top: 105,
        left: 23,
        textAlign: "left",
        lineHeight: 20,
        position: "absolute",
    },
    restaurantNameLayout: {
        height: 29,
        width: 149,
        fontSize: FontSize.size_6xl,
        alignItems: "center",
        display: "flex",
        color: Color.colorWhite,
    },
    lastMessage: {
        top: 135,
        left: 23,
        textAlign: "left",
        lineHeight: 20,
        position: "absolute",
    },
    lastMessageLayout: {
        height: 29,
        width: 149,
        fontSize: FontSize.size_6xl,
        alignItems: "center",
        display: "flex",
        color: 'grey'
    },
})