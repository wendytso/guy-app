import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUserId = async () => {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        setUser(value);
      }
    };
    getUserId();
  }, []);

  return (
    <View>
      <Text>Profile</Text>
      <Text>Phone number: {user}</Text>
    </View>
  );
};
export default Search;
