import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from "moment";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "../../services/axiosInterceptor.jsx";

import { useNavigation } from '@react-navigation/native';

const Messages = ({ message, restaurantImage }) => {

    const [myImage, setMyImage] = useState('')
    const altProfileImage = require('../assets/images/icons8-customer-50.png')
    const navigation = useNavigation();

    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const fetchMyImage = async () => {
        try {
            const { data } = await axios.get(`http://${apiUrl}:3000/api/customers/profile/`);

            setMyImage(data.profilePic);
        } catch (error) {
            navigation.navigate('LoginScreen');
            console.error('Error fetching user data:', error);

        }
    }

    useEffect(() => {
        fetchMyImage()
    }, [])

    return (
        <>

            <View style={{ display: "flex", flexDirection: message.sender === 'restaurant' ? 'row' : 'row-reverse' }}>
                {message.sender === 'restaurant' && (<Image
                    source={{ uri: restaurantImage.main_image }}
                    style={styles.image} />)}
                {message.sender === 'customer' && (<Image
                    source={myImage ? myImage : altProfileImage}
                    style={styles.myImage} />)}
                <View style={message.sender === 'restaurant' ? styles.message : styles.myMessage}   >

                    <View style={styles.messageTop}  >

                        <Text style={message.sender === 'restaurant' ? styles.messageText : styles.myMessageText} >
                            {message.message}

                        </Text>

                    </View>

                </View>
            </View>

            <Text style={message.sender === 'restaurant' ? styles.messageBottom : styles.myMessageBottom} className="messageBottom ">{moment(message.createdAt).fromNow()}</Text>

        </>

    )
}

export default Messages

const styles = StyleSheet.create({



    messageBottom: {
        fontSize: 12,
        color: 'white',
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5



    },
    myMessageBottom: {
        fontSize: 12,
        color: 'white',
        textAlign: 'right',
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5

    },
    messageTop: {
        display: 'flex',
        flexDirection: 'row',

    },
    message: {
        display: 'flex',
        borderRadius: 20,
        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: "red"


    },
    messageText: {

        color: 'white',
        fontSize: 17,
        backgroundColor: "red"

    },
    myMessage: {
        display: 'flex',
        padding: 10,
        borderRadius: 20,
        maxWidth: '80%',
        alignSelf: 'flex-end',
        overflow: 'hidden',
        borderWidth: 2,
        backgroundColor: 'rgb(245, 241, 241)',
    },
    myMessageText: {

        borderRadius: 20,
        fontSize: 17,
        alignSelf: 'flex-end',
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 16,
        margin: 5,
        alignSelf: 'flex-start',

    },
    myImage: {
        width: 25,
        height: 25,
        borderRadius: 16,
        margin: 5,
        alignSelf: 'flex-start',

    },

})





