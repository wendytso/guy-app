import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

interface TextProps {
    style: object
    children: ReactNode
}


const CustomText: React.FC<TextProps> = ({ style, children }: TextProps) => {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Chalkboard SE',
        fontSize: 20,
        color: 'black',
    },
});

export default CustomText;
