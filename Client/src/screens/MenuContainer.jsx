import React from "react";
import { View, StyleSheet, FlatList, Image, Pressable } from "react-native";

const MenuContainer = ({ route, navigation }) => {
    const data = route.params.menuImages;
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.imageContainer} key={index}>
                <Image source={{ uri: item }} style={styles.menuImage} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
            <View style={styles.innerContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={true}
                />
            </View>
        </View>
    );
};

export default MenuContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    innerContainer: {
        width: "90%",
        height: "70%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 16,
        elevation: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: 350,
        alignItems: "center",
        justifyContent: "center"
    },
    menuImage: {
        height: 400,
        width: 300,
        borderRadius: 16,
    },
});