import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import Logo from "../assets/logo.svg";
import CustomTextInput from "../components/TextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const Search = () => {
  const [prompt, setPrompt] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    }
    getUserId();

  }, [])

  const handleTextSubmit = async () => {
    if (!prompt.trim()) {
      Alert.alert("Error", "Prompt cannot be empty.");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/match_prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: user,
          prompt: prompt,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        setPrompt("");
        if (data && data?.length > 0) {
          const first_user = data[0]?.matched_user
          let matching_skill = null
          first_user.skills.forEach((skill: string) => {
            if (data[0]?.matched_skills.some((match: string) => {
              return match == skill
            }))
              matching_skill = skill
          })
          Alert.alert("Success", `Found ${first_user.name} who is a ${matching_skill}`);
        }
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.log("error", error)
      Alert.alert("Error", "Failed to submit request. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Logo style={{ height: 100 }} />
      <CustomTextInput
        placeholder="What do you need help with?"
        value={prompt}
        onChangeText={setPrompt}
        keyboardType="phone-pad"
        onSubmitEditing={handleTextSubmit}
      />
    </View>
  );
};
export default Search;
