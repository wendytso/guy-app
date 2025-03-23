import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlaceholderProfile from "../assets/placeholder.svg";
import Divider from "../assets/divider.svg";

const Search = () => {
  const [user, setUser] = useState("");
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      const phone = await AsyncStorage.getItem("user");
      if (!phone) return;
      setUser(phone);

      try {
        const res = await fetch(`https://2890-128-189-236-142.ngrok-free.app/users/${phone}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    getUserProfile();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${user}`
        );
        const data = await response.json();
        setName(data.user_data.name);
        setSkills(data.user_data.skills);
      } catch (error) {
      }
    };
    fetchSkills();
  }, [user]);

  return (
    <View style={styles.view}>
      <PlaceholderProfile style={{ display: "flex" }} />
      <View style={styles.text}>
        <Text style={{ fontSize: 32, fontFamily: "Chalkboard SE" }}>
          {name}
        </Text>
        <Text>lives in location</Text>
        <Text>X kms away</Text>
        <Divider style={styles.divider} />
        <Text>call {user}</Text>
        <Divider style={styles.divider} />
        <Text>i'm your guy for:</Text>
        {skills.map((item, index) => (
          <View style={styles.bubble} key={index}>
            <Text key={index} style={styles.bubbleText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  divider: { height: 20, marginTop: 20, marginBottom: 20 },
  bubbleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  bubble: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
  },
});

export default Search;
