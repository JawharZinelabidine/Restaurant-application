import React from 'react';
import { View, Text ,  ScrollView,  TouchableOpacity, StyleSheet} from 'react-native';

export default function Categorys() {
    const categories = [
        "Italian",
        "Tunisian",
        "Japanese",
        "Lebanese",
        "Steakhouse",
        "Breakfast",
        "Mexican",
        "French",
      ];
  return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.CategoryStyleView}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.CategoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

  );
}

const styles = StyleSheet.create({
    CategoryScrollViewStyle: {
        paddingHorizontal: 10,
     paddingTop: -30,
     paddingBottom: 20,
        position: 'relative',
        shadowColor: "red", // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.2, // Shadow opacity
        shadowRadius: 4, // Shadow radius
        elevation: 2, // Android elevation (elevates the view)
      },
      ActiveCategory: {
        flexDirection: "row",
        
      },
      CategoryText: {
        color: "black",
        margin: 10,
        textAlign: "center", 
        
      },
      CategoryStyleView: {
   
        overflow: "hidden", 
        borderWidth: 1,
        borderColor: "red",
        marginHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 20,
        
      
      },
});