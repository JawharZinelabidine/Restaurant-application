import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize } from "../../GlobalStyles";
import React from 'react'
import { useEffect, useState } from 'react';
import axios from '../../services/axiosInterceptor';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
                colors={["#fff", "rgba(225, 225, 225, 225)"]}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <Text style={[styles.restaurantName, styles.restaurantNameLayout]}>{restaurantName?.name}</Text>
                <MaterialCommunityIcons name="message" size={24} color="red" style={styles.icon} />

            </View>
            <Text style={[styles.lastMessageDate, styles.lastMessageDateLayout]}>{moment(latestMessageDate).fromNow()}</Text>
            <Text style={[styles.lastMessage, styles.lastMessageLayout]}>{latestMessage.length >= 30 ? `${latestMessage.slice(0, 30)}...` : latestMessage}</Text>



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
        backgroundColor: "white",

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
    },
    icon: {
        top: 105,
        lineHeight: 20,

    },
    restaurantNameLayout: {
        height: 29,
        width: 149,
        fontSize: FontSize.size_6xl,
        alignItems: "center",
        fontWeight: 'bold',
        color: Color.colorBlack,
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
        top: 135,
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
        color: Color.colorBlack,
    },
})