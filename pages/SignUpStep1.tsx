import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomTextInput from '../components/TextInput';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

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


const SignUpStep1 = ({ navigation }: any) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNext = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        navigation.navigate('SignUpStep2', {
            firstName,
            lastName,
            phoneNumber,
            password,
        });
    };

    return (
        <View style={styles.center}>
            <Text style={{ fontSize: 26, marginBottom: 20 }}>the guy app</Text>
            <CustomTextInput placeholder="first name" onChangeText={setFirstName} value={firstName} />
            <CustomTextInput placeholder="last name" onChangeText={setLastName} value={lastName} />
            <CustomTextInput placeholder="phone number" keyboardType="phone-pad" onChangeText={setPhoneNumber} value={phoneNumber} />
            <CustomTextInput placeholder="password" secureTextEntry onChangeText={setPassword} value={password} />
            <CustomTextInput placeholder="re-enter password" secureTextEntry onChangeText={setConfirmPassword} value={confirmPassword} />
            <View style={{ marginTop: 10 }}>
                <Button title="create an account" onPress={handleNext} disabled={!firstName || !lastName || !phoneNumber || !password || !confirmPassword} />
            </View>
            <BackButton />
        </View>
    );
};

export default SignUpStep1;
