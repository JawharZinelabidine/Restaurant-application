import { AirbnbRating } from 'react-native-ratings';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState, useRef } from 'react';
import axios from '../../services/axiosInterceptor'



export default function ReviewForm({ route, navigation }) {
    const {
        id,
        date,
        time,
        customerId,
        restaurantId,
        notification,
        canReview,
        status,
    } = route.params.reservation;
    const restaurants = route.params.restaurants;
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const toastRef = useRef(null);

    const [showToast, setShowToast] = useState(false);
    const [showToast2, setShowToast2] = useState(false);
    const [rating, setRating] = useState(null)
    const [review, setReview] = useState({ review_title: '', review_body: '', rating: null })

    const ratingCompleted = (Rating) => {
        setRating(Rating)
        console.log(rating)
    }


    const handleChange = (name, value) => {
        setReview((values) => ({ ...values, [name]: value, rating: rating }));
    };



    const handleSubmit = async () => {
        if (review.review_title && review.review_body) {
            try {
                await axios.post(`http://${apiUrl}:3000/api/reviews/${restaurantId}`, review)

            } catch (error) {
                console.log(error)
                if (error.response.status === 401) {
                    setShowToast(true);
                    if (toastRef.current) {
                        toastRef.current.show();
                    }
                }
            }
        }

        try {
            console.log(rating)
            await axios.put(`http://${apiUrl}:3000/api/restaurants/${restaurantId}/${id}`, { rating: rating })
            setShowToast2(true)
            if (toastRef.current) {
                toastRef.current.show();
            }
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
            if (error.response.status === 401) {
                setSpotsRemaining("You need to be logged in");
                setShowToast(true);
                if (toastRef.current) {
                    toastRef.current.show();
                }
            }

        }

    }

    const restaurantName = restaurants.slice().find((restaurant) => {
        return restaurant.id === restaurantId
    })

    return (

        <View style={styles.container} >
            {showToast && (
                <ToastMessage
                    ref={toastRef}
                    type="danger"
                    text="You need to be logged in"
                    timeout={3000}
                />
            )}
            {showToast && (
                <ToastMessage
                    ref={toastRef}
                    type="success"
                    text='Rating submitted!'
                    timeout={3000}
                />
            )}


            <Text>{restaurantName.name} would love your feedback!</Text>

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
                    placeholder='Write your review title (optional)'
                    onChangeText={(text) => handleChange("review_title", text)}

                />

                <TextInput

                    style={styles.body}
                    placeholder='How was your experience? (optional)'
                    onChangeText={(text) => handleChange("review_body", text)}

                />

                <TouchableOpacity style={styles.btn} >
                    <Text style={styles.btnText} onPress={handleSubmit}>Submit</Text>

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