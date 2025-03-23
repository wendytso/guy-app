import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Logo from "../assets/logo.svg";
import CustomTextInput from "../components/TextInput";

const Search = () => {
  const [prompt, setPrompt] = useState("");
  return (
    <View>
      <Text>Search</Text>
      <Logo style={{ height: 100 }} />
      {/* <CustomTextInput placeholder="What do you need help with?" value={prompt} onChangeText={setPrompt} keyboardType="phone-pad" onSubmitEditing={ } /> */}
    </View>
  );
};
export default Search;
