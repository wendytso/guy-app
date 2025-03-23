import React from 'react';
import { Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.button, disabled && { opacity: 0.6 }]}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#eee',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'Chalkboard SE',
        fontSize: 20,
        color: 'black',
    },
});

export default Button;
