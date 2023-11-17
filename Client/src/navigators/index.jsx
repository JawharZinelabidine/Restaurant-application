import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from 'react-redux';
import store from '../features/store'

import {
    Splashscreen,
    Logo,
    TabNavigator,
    RestaurantDetails,
    ForgetPasswordEmail,
    VerificationCodeScreen,
    RegisterScreen,
    MenuContainer,
    ReviewForm,
    ReservationReviews,
    EnterEmailForReset,
    EnterCodeForReset,
    UpdatePassword,
    CustomerProfile,
    HomeScreen,
    LoginScreen
} from "../screens";





const Stack = createStackNavigator();



const Navigators = () => {




    return (
        <Provider store={store} >
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Logo" component={Logo} />
                    <Stack.Screen name="Splash" component={Splashscreen} />
                    <Stack.Screen name="TabNav" component={TabNavigator} />
                    <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
                    <Stack.Screen
                        name="ForgetPasswordEmail"
                        component={ForgetPasswordEmail}
                    />
                    <Stack.Screen
                        name="VerificationCodeScreen"
                        component={VerificationCodeScreen}
                    />
                    <Stack.Screen name="ReviewForm" component={ReviewForm} />
                    <Stack.Screen name="ReservationReviews" component={ReservationReviews} />
                    <Stack.Screen
                        name="EnterEmailForReset"
                        component={EnterEmailForReset}
                    />
                    <Stack.Screen name="EnterCodeForReset" component={EnterCodeForReset} />
                    <Stack.Screen name="UpdatePassword" component={UpdatePassword} />

                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />


                    <Stack.Screen name="MenuContainer" component={MenuContainer} options={{ presentation: "transparentModal" }} />

                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
};
export default Navigators;

