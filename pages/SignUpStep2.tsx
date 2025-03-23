import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const availableSkills = ['baking', 'driving', 'dyeing clothes'];

const SignUpStep2 = ({ route, navigation }: any) => {
    const { firstName, lastName, phoneNumber, password } = route.params;
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const toggleSkill = (skill: string) => {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        );
    };

    const handleComplete = async () => {
        try {
            const res = await fetch('https://2890-128-189-236-142.ngrok-free.app/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    phone_number: phoneNumber,
                    password,
                    skills: selectedSkills,
                    connections: [],
                    location: '',
                    photo: '',
                }),
            });

            if (res.ok) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                const err = await res.text();
                console.error(err);
                alert('Something went wrong signing up.');
            }
        } catch (err) {
            console.error(err);
            alert('Network error.');
        }
    };

    return (
        <View style={styles.center}>
            <Text style={{ fontSize: 24 }}>hi {firstName.toLowerCase()}!</Text>
            <Text style={{ marginVertical: 15 }}>what kind of guy are you?</Text>
            <CustomTextInput placeholder="select some skills" editable={false} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                {availableSkills.map(skill => (
                    <Text
                        key={skill}
                        onPress={() => toggleSkill(skill)}
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            margin: 4,
                            fontFamily: 'Chalkboard SE',
                            backgroundColor: selectedSkills.includes(skill) ? '#ddd' : 'white',
                        }}
                    >
                        {skill}
                    </Text>
                ))}
            </View>
            <Button title="see your network of guys" onPress={handleComplete} />
        </View>
    );
};

export default SignUpStep2;
