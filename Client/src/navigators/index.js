import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Splashscreen,
  Logo,
  TabNavigator,
  RestaurantDetails,
  ForgetPasswordEmail,
  VerificationCodeScreen,
  NewPasswordScreen,
  RegisterScreen,
  ReservationListScreen,
  MenuContainer,
} from "../screens";

const Stack = createStackNavigator();

const Navigators = () => {
  return (
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
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ReservationListScreen" component={ReservationListScreen} />
        <Stack.Screen name="MenuContainer" component={MenuContainer} options={{ presentation: "transparentModal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigators;
