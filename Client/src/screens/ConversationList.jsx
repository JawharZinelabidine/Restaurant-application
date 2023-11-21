import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize } from "../../GlobalStyles";
import React from 'react'
import { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";


const ConversationList = ({ conversation, restaurants, onPress }) => {


    const [latestMessage, setLatesetMessage] = useState([])
    const [latestMessageDate, setlatestMessageDate] = useState([])


    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const isFocused = useIsFocused();


    const handleButtonPress = () => {
        onPress(conversation);
    };

    const getMessages = async () => {
        try {

            const { data } = await axios.get(`http://${apiUrl}:3000/api/messages/customer/messages/${conversation.restaurantId}`)
            setLatesetMessage(data[data.length - 1].message)
            setlatestMessageDate(data[data.length - 1].createdAt)
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
        if (isFocused) {
            getMessages()
            console.log('logging')
        }

    }, [isFocused])



    return (


        <TouchableOpacity onPress={handleButtonPress} style={{ width: '100%', display: 'flex' }}>

            <LinearGradient
                style={[styles.rectangleLineargradient, styles.groupIconLayout]}
                locations={[0, 1]}
                colors={["#000", "rgba(0, 0, 0, 0)"]}
            />
            <Text style={[styles.restaurantName, styles.restaurantNameLayout]}>{restaurantName?.name}</Text>
            <Text style={[styles.lastMessageDate, styles.lastMessageDateLayout]}>{moment(latestMessageDate).fromNow()}</Text>
            <Text style={[styles.lastMessage, styles.lastMessageLayout]}>{latestMessage.slice(0, 30)}...</Text>



        </TouchableOpacity>


    )
}

export default ConversationList



const styles = StyleSheet.create({


    topInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },


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
        width: 300,
        fontSize: FontSize.size_6xl,
        alignItems: "center",
        display: "flex",
        color: 'grey'
    },
    lastMessageDate: {
        top: 105,
        left: 270,
        marginRight: 30,
        textAlign: "left",
        lineHeight: 20,
        position: "absolute",
    },
    lastMessageDateLayout: {
        height: 29,
        width: 300,
        fontSize: FontSize.size_6xl,
        alignItems: "center",
        display: "flex",
        color: Color.colorWhite,
    },
})