import React, { useState, useEffect } from 'react';
import {
  View, TextInput, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const SignUp = ({ onLogin }: { onLogin: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://2890-128-189-236-142.ngrok-free.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phoneNumber,
            name,
            password,
            skills: [],
            connections: [],
            location: "",
            photo: "",
          }),
        }
      );

      if (response.ok) {
        await AsyncStorage.setItem("user", phoneNumber);
        onLogin();
      } else {
        const err = await response.text();
        console.error(err);
        alert("Sign up failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during sign up");
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <CustomTextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <CustomTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Create Account" onPress={handleSignUp} />
    </View>
  );
};

export default SignUp