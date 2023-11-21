import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import moment from "moment";


const Messages = ({ message, restaurantImage }) => {


    return (
        <>
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
        marginLeft: 5


    },
    myMessageBottom: {
        fontSize: 12,
        color: 'white',
        textAlign: 'right',
        marginRight: 5

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

    },
    messageText: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#EF0107',
        color: 'white',
        fontSize: 17,

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
        alignSelf: 'auto',
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