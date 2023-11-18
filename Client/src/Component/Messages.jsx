import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { Display } from "../utils";
import moment from "moment";


const Messages = ({ message }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const socket = useRef()
    const isFocused = useIsFocused()



    return (

        <View style={message.sender === 'restaurant' ? styles.message : styles.myMessage}   >
            <View style={styles.messageTop}  >
                <Text style={message.sender === 'restaurant' ? styles.messageText : styles.myMessageText} >
                    {message.message}

                </Text>
            </View>
            <Text style={styles.messageBottom} className="messageBottom ">{moment(message.createdAt).fromNow()}</Text>

        </View>


    )
}

export default Messages

const styles = StyleSheet.create({


    messageImg: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        objectFit: 'cover',
        marginRight: 10,
    },
    messageBottom: {
        fontSize: 12,
        color: 'white',
        paddingLeft: 5,
        top: 8,
    },
    messageTop: {
        display: 'flex',

    },
    message: {

        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',



    },
    messageText: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#EF0107',
        color: 'white',
        fontSize: 17,
        alignSelf: 'flex-start',
    },
    myMessage: {
        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    myMessageText: {

        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(245, 241, 241)',
        color: 'black',
        alignSelf: 'flex-start',
    },


})