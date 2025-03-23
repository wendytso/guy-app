import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaceholderProfile from "../assets/placeholder.svg";
import ProfileCard from "../components/ProfileCard";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation<any>()
  const [user, setUser] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [availability, setAvailability] = useState("i’m pretty free these days! please leave a voicemail.");

  useEffect(() => {
    const getUserProfile = async () => {
      const phone = await AsyncStorage.getItem("user");
      if (!phone) return;
      setUser(phone);
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      if (!user) return;
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${user}`);
        const data = await response.json();
        setName(data.user_data.name);
        setSkills(data.user_data.skills || []);
        setPhoto(data.user_data.photo);
        setLocation(data.user_data.location || "west vancouver, bc");
        setAvailability(data.user_data.availability || availability);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profile_container}>
        <View style={styles.avatar_container}>
          <Image
            style={styles.photo}
            source={{
              uri: photo || "https://firebasestorage.googleapis.com/v0/b/biztech-bot.appspot.com/o/profiles%2F4.jpg?alt=media&token=d38c973e-231b-433f-b4e3-b2d5aaa66a24",
            }}
          />

          <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditProfile', {})}>
            <Text style={styles.editButtonText}>edit profile</Text>
          </Pressable>
        </View>
        <View style={styles.info_container}>

          <Text style={styles.name}>{name.toLowerCase()}</Text>
          <Text style={styles.location}>lives in {location.toLowerCase()}</Text>
          <Text style={styles.distance}>2 km away</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>availability</Text>
        <Text style={styles.sectionText}>{availability}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>skills/hobbies</Text>
        <View style={styles.bubbleContainer}>
          {skills.map((item, index) => (
            <View key={index} style={styles.bubble}>
              <Text style={styles.bubbleText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  info_container: {
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    marginLeft: 20
  },
  profile_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignContent: "center",
  },
  avatar_container: {
    width: "25%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center"
  },
  container: {
    padding: 25,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#ddd",
    marginTop: 30,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
  },
  editButtonText: {
    fontSize: 12,
    fontFamily: "Chalkboard SE",
  },
  name: {
    fontFamily: "Chalkboard SE",
    fontSize: 24,
    marginBottom: 5,
  },
  location: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
  },
  distance: {
    fontFamily: "Chalkboard SE",
    fontSize: 12,
    marginBottom: 20,
  },
  section: {
    alignSelf: "flex-start",
    marginTop: 20,
    width: "100%",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontFamily: "Chalkboard SE",
    marginBottom: 5,
    fontSize: 14,
  },
  sectionText: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
  },
  bubbleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    marginBottom: 10,
  },
  bubbleText: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
  },
});

export default Profile;
