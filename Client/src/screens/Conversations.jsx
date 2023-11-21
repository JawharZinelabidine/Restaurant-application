import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState, useRef } from 'react';
import { Colors } from "../contants";
import ConversationList from './ConversationList.jsx'
import axios from '../../services/axiosInterceptor.jsx';
import { useIsFocused } from '@react-navigation/native';
import { Display } from "../utils";
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { setMessageNotificationBadge } from '../../src/features/notificationSlice';
import { useSelector } from 'react-redux'
import { setToken } from "../../src/features/loggedinSlice.js";

import { useNavigation } from '@react-navigation/native';




export default function Conversations() {

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const [conversations, setConversations] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const { token } = useSelector(state => state.loggedin);





    const getConvos = async () => {
        try {
            const { data } = await axios.get(`http://${apiUrl}:3000/api/messages/customer/conversations`)
            const uniqueConversationsMap = {};
            for (const conversation of data) {
                const { restaurantId, createdAt } = conversation;
                if (!uniqueConversationsMap[restaurantId] || new Date(createdAt) > new Date(uniqueConversationsMap[restaurantId].createdAt)) {
                    uniqueConversationsMap[restaurantId] = conversation;
                }
            }
            const uniqueConvos = Object.values(uniqueConversationsMap);
            const sortedConvos = uniqueConvos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setConversations(sortedConvos)
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                setConversations([]);
            }
        }
    }

    const findRestaurantName = async () => {
        try {

            const { data } = await axios.get(`http://${apiUrl}:3000/api/restaurants`)
            setRestaurants(data)

        } catch (error) {
            console.log(error)
        }
    }


    const handleButtonPress = (conversation, restaurants, token) => {
        navigation.navigate("Messages", { conversation, restaurants, token });

    };

    const getToken = async () => {

        const token = await SecureStore.getItemAsync('token')
        if (token) {
            dispatch(setToken(token))
        }
    }

    const removeNotificationBadge = async () => {
        try {
            const { data } = await axios.put(`http://${apiUrl}:3000/api/customers/notification`)
            dispatch(setMessageNotificationBadge(data))

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        if (isFocused) {
            getToken()
            getConvos()
            findRestaurantName()
            removeNotificationBadge()
        }



    }, [isFocused])




    return (

        <View style={styles.container}>
            {conversations.length > 0 && (<ScrollView
                style={styles.constainer2}
                contentContainerStyle={styles.scrollViewContent}

            >
                {conversations.map((conversation, index) => (
                    <View key={index} style={styles.card}
                    >

                        <ConversationList conversation={conversation} restaurants={restaurants}
                            onPress={(conversation) => handleButtonPress(conversation, restaurants, token)} ></ConversationList>
                    </View>
                ))}





            </ScrollView>)}
            {!conversations.length && token && (
                <View style={styles.loginMessage}>

                    <Text style={styles.loginMessageText}>You don't have any conversations yet.</Text>
                </View>
            )}
            {!conversations.length && !token && (
                <View style={styles.loginMessage}>

                    <Text style={styles.loginMessageText}>Log in to see your conversations!</Text>
                </View>
            )}

            <View style={styles.topedite}></View>

        </View>
    )




}


const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: Colors.primaryBlackHex,


    },
    constainer2: {
        flex: 1,
        backgroundColor: Colors.DARK_ONE,
        marginTop: -150,

    },
    topedite: {
        marginTop: 100,

    },
    scrollViewContent: {
        paddingVertical: 100,
    },
    card: {
        borderRadius: 10,
        margin: 5,
        padding: 2,
        width: Display.setWidth(90),
        marginBottom: 100,

    },
    loginMessage: {
        borderRadius: 10,
        margin: 5,
        padding: 2,
        marginTop: 350,
    },
    loginMessageText: {
        color: 'white',
        alignSelf: 'center'
    }

})