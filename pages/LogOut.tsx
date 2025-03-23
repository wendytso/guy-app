import React, { useState, useEffect } from 'react';
import {
    View, Text, Button, TextInput, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LogOut = ({ setUser }: { setUser: (user: string | null) => void }) => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const logOutUser = async () => {
            await AsyncStorage.clear();
            setUser(null);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }],
            });
        };
        logOutUser();
    }, []);

    return (
        <View>
            <Text>Logging out...</Text>
        </View>
    );
};

export default LogOut