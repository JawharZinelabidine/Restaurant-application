import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Upcoming, History } from "../screens";
import { Display } from "../utils";
import { StyleSheet } from "react-native";

const marginTopPercentage = 4;
const marginTop = Display.setHeight(marginTopPercentage);

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator style={styles.tabBarStyle} >
      <Tab.Screen name="Upcoming" component={Upcoming} />
     
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}
export default MyTabs;

const styles = StyleSheet.create({
  tabBarStyle: {
    marginTop,
    backgroundColor: "black",
  },
});
