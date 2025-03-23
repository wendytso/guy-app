import React from 'react';
import {
    View, Text, StyleSheet, Image
} from 'react-native';
import Button from '../components/Button';
import Logo from "../assets/logo.svg";

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


const Welcome = ({ navigation }: { navigation: any }) => (
    <View style={styles.center}>
        <Logo style={{ height: 100 }} />
        <Text style={{ fontSize: 24, marginBottom: 20, fontFamily: 'Chalkboard SE' }}>the guy app</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <View style={{ height: 10 }} />
        <Button title="Create Account" onPress={() => navigation.navigate('SignUpStep1')} />
    </View>
);

export default Welcome