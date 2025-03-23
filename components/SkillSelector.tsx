import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    Pressable,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import skillsData from '../lib/skills';

interface SkillSelectorProps {
    selectedSkills: string[];
    setSelectedSkills: (skills: string[]) => void;
}

const SkillSelector = ({ selectedSkills, setSelectedSkills }: SkillSelectorProps) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);

    useEffect(() => {
        setSkills(skillsData);
        setFiltered(skillsData);
    }, []);

    const handleInputChange = (text: string) => {
        setQuery(text);
        const lowercaseText = text.toLowerCase();
        const matches = skills.filter(skill =>
            skill.toLowerCase().includes(lowercaseText)
        );
        setFiltered(matches);
    };

    const addSkill = (skill: string) => {
        if (!skill.trim() || selectedSkills.includes(skill)) return;
        setSelectedSkills([...selectedSkills, skill]);
        setQuery('');
        Keyboard.dismiss();
    };

    const handleEnter = () => {
        if (query.trim() !== '') {
            addSkill(query.trim());
        }
    };

    const removeSkill = (skill: string) => {
        Alert.alert('Remove skill?', `"${skill}" will be removed.`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Remove',
                onPress: () =>
                    setSelectedSkills(selectedSkills.filter((s) => s !== skill)),
                style: 'destructive',
            },
        ]);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ width: '100%', alignItems: 'center' }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={query}
                        onChangeText={handleInputChange}
                        onSubmitEditing={handleEnter}
                        placeholder="select some skills"
                        style={styles.input}
                        placeholderTextColor="#777"
                    />
                    <Text style={styles.dropdownArrow}>⌄</Text>
                </View>

                {query.length > 0 && (
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item}
                        style={{ maxHeight: 120 }}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => addSkill(item)} style={styles.option}>
                                <Text style={styles.optionText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                )}

                <View style={styles.bubbleContainer}>
                    {selectedSkills.map((skill) => (
                        <Pressable
                            key={skill}
                            onLongPress={() => removeSkill(skill)}
                            style={styles.bubble}
                        >
                            <Text style={styles.bubbleText}>{skill}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#eee',
        borderRadius: 999,
        paddingVertical: 14,
        paddingHorizontal: 20,
        fontSize: 22,
        fontFamily: 'Chalkboard SE',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        fontFamily: 'Chalkboard SE',
        fontSize: 18,
    },
    dropdownArrow: {
        fontSize: 22,
        paddingLeft: 10,
        fontFamily: 'Chalkboard SE',
    },
    option: {
        padding: 10,
        width: '90%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    optionText: {
        fontFamily: 'Chalkboard SE',
        fontSize: 16,
    },
    bubbleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    bubble: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: '#fff',
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
    },
    bubbleText: {
        fontFamily: 'Chalkboard SE',
        fontSize: 14,
    },
});

export default SkillSelector
