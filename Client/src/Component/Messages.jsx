import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from "moment";


const Messages = ({ message, restaurantImage }) => {


    return (

        <View style={message.sender === 'restaurant' ? styles.message : styles.myMessage}   >
            <View style={styles.messageTop}  >
                {message.sender === 'restaurant' && (<Image
                    source={{ uri: restaurantImage.main_image }}
                    style={styles.image} />)}

                <Text style={message.sender === 'restaurant' ? styles.messageText : styles.myMessageText} >
                    {message.message}

                </Text>
                {message.sender === 'customer' && (<Image
                    source={require('../assets/images/man.png')}
                    style={styles.myImage} />)}
            </View>
            <Text style={styles.messageBottom} className="messageBottom ">{moment(message.createdAt).fromNow()}</Text>

        </View>


    )
}

export default Messages

const styles = StyleSheet.create({



    messageBottom: {
        fontSize: 12,
        color: 'white',
        paddingLeft: 5,
        top: 8,
    },
    messageTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    message: {
        display: 'flex',
        borderRadius: 20,
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
        display: 'flex',
        padding: 10,
        borderRadius: 20,
        maxWidth: '80%',
        alignSelf: 'flex-end',
    },
    myMessageText: {

        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(245, 241, 241)',
        color: 'black',
        fontSize: 17,
        alignSelf: 'flex-end',
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 16,
        alignSelf: 'flex-start',
        margin: 5
    },
    myImage: {
        width: 25,
        height: 25,
        borderRadius: 16,
        alignSelf: 'flex-start',
        margin: 5


    },

})