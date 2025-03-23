import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => navigation.goBack()} style={styles.container}>
            <Text style={styles.arrow}>←</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        padding: 10,
    },
    arrow: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Chalkboard SE',
    },
});

export default BackButton;
