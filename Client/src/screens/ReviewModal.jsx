import React from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Colors } from "../contants";
import { AntDesign } from "@expo/vector-icons";

const ReviewModal = ({ isVisible, reviews, onClose }) => {
  return (
    <Modal transparent={true} visible={isVisible}>
      <Pressable
        style={{ backgroundColor: "#000000aa", flex: 1 }}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
          
              <View  style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>title</Text>
                <Text style={styles.reviewAuthor}>name</Text>
                <Text style={styles.reviewBody}>body</Text>
                
              </View>
              <View  style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>title</Text>
                <Text style={styles.reviewAuthor}>name</Text>
                <Text style={styles.reviewBody}>body</Text>
                
              </View>
              <View  style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>title</Text>
                <Text style={styles.reviewAuthor}>name</Text>
                <Text style={styles.reviewBody}>body</Text>
                
              </View>
           
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={Colors.DARK_ONE} />
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#FFF",
        margin: 20,
        padding: 24,
        borderRadius: 10,
        flex: 1,
      },
      reviewContainer: {
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "#FFF", 
      },
      reviewTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginBottom: 8,
      },
      reviewBody: {
        color: "#666",
        marginBottom: 8,
      },
      reviewAuthor: {
        fontStyle: "italic",
        color: "#888",
      },
      closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
      },
    });

export default ReviewModal;
