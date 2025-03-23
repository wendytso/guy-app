import React, { useState, useEffect } from 'react';
import {
    View, TextInput, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20,
    },
    input: {
        height: 50, borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5,
    },
    center: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
});

const LogIn = ({ onLogin }: { onLogin: () => void }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://2890-128-189-236-142.ngrok-free.app/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone_number: phoneNumber, password }),
            });

            const result = await response.json();

            if (result.auth === true) {
                await AsyncStorage.setItem('user', phoneNumber);
                onLogin();
            } else {
                alert('Invalid phone number or password');
            }
        } catch (err) {
            console.error(err);
            alert('Login failed.');
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <CustomTextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
            <CustomTextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
        </View>
    );
};

export default LogIn