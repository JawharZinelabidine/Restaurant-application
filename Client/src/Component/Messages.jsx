import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import moment from "moment";


const Messages = ({ message }) => {



    return (

        <View style={message.sender === 'restaurant' ? styles.message : styles.myMessage}   >
            {console.log(message)}
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    messageTop: {
        display: 'flex',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    message: {

        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    messageText: {
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#EF0107',
        color: 'white',
        fontSize: 17,
        alignSelf: 'flex-start',

    },
    myMessage: {
        padding: 10,
        maxWidth: '80%',
        alignSelf: 'flex-end',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    myMessageText: {

        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgb(245, 241, 241)',
        color: 'black',
        fontSize: 17,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },


})