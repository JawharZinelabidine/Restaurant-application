import { Rating, AirbnbRating, TapRatingProps } from 'react-native-ratings';

import { View, Text, StyleSheet, ScrollView, Modal, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';




export default function ReviewForm({ navigation }) {

    const [rating, setRating] = useState()

    const ratingCompleted = (rating) => {
        console.log("rating is: " + rating)
        setRating(rating)
    }


    return (

        <View style={styles.container} >



            <Text>Restaurant_name would love your feedback!</Text>

            <AirbnbRating
                showRating
                size={50}
                reviews={["Terrible", "Bad", "Meh", "Good", "Excellent",]}
                defaultRating={'none'}
                onFinishRating={ratingCompleted}

            />
            {rating && (<View style={styles.container2}>
                <TextInput

                    style={styles.title}
                    placeholder='Write your review title'
                />

                <TextInput

                    style={styles.body}
                    placeholder='How was your experience?'

                />

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText}>Submit</Text>

                </TouchableOpacity>
            </View>)}


        </View>
    )


}


const styles = StyleSheet.create({


    container: {
        flex: 1,

        marginTop: 170,
        alignItems: 'center'
    },
    container2: {
        flex: 1,

        alignItems: 'center'
    },

    title: {
        height: 40,
        backgroundColor: 'white',
        borderColor: '#F00',
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        borderRadius: 8,
        top: 100,
        width: 400,
        margin: 'auto'

    },
    body: {
        height: 200,
        backgroundColor: 'white',
        borderColor: '#F00',
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
        borderRadius: 8,
        top: 100,
        width: 400,
        marginTop: 20,
        paddingBottom: 150



    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },

    btn: {
        borderRadius: 8,
        backgroundColor: '#F00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        top: 150
    },

})