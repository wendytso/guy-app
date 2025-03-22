import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Frame from "../icons/frame.svg";
import CheckboxIcon from '../icons/checkbox.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addChore } from '../slice/ChoresSlice';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    roundedInput: {
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    weekdayContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        display: 'flex',
        borderRadius: 12,
        backgroundColor: '#ccc',
        columnGap: 1,
        overflow: "hidden"
    },
    weekdayButton: {
        padding: 11,
        backgroundColor: "#ccc",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    weekdayButtonSelected: {
        backgroundColor: '#ffffff',
    },
    weekdayText: {
        fontSize: 12,
    },
    weekdayTextSelected: {
        color: "black",
        alignSelf: "center"
    },
    inputContainer: { marginLeft: -8, height: 55 },
    emojiInputContainer: {
        display: 'flex',
        flexDirection: "row",
        maxWidth: "100%",
        flexWrap: "nowrap",
        overflow: "hidden",
        marginBottom: -15
    },
    label: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 12
    },
    createButton: {
        width: 165,
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden"
    },
    listItem: {
        padding: 16,
        paddingTop: 21,
        paddingBottom: 21,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 20,
        width: 100,
        rowGap: 13,
        boxShadow: "1px 4px 15px 2px rgba(0,0,0,0.66)"
    },
    backgroundSelected: {
        backgroundColor: "#F4FFE5",
    },
    listItemShadow: {
        shadowColor: '#212121',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11,
    },
    flatListContainer: {
        maxHeight: "80%",
        display: "flex",
        columnGap: 100,
        padding: 20
    },
    listItemTitle: {
        fontSize: 15,
        fontWeight: "700",
    },
    listItemPoints: {
        fontSize: 25,
        fontWeight: "700"
    },
    listItemText: {
        fontSize: 15,
        fontWeight: "500"
    }
});


interface Weekday {
    name: string;
    selected: boolean;
}

interface IAddChores {
    refetch: () => void;
}

const AddChores = ({ refetch }: IAddChores) => {
    const [title, setTitle] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState<string>('');

    const dispatch = useDispatch();

    const initialWeekdays: Weekday[] = [
        { name: 'Sun', selected: false },
        { name: 'Mon', selected: false },
        { name: 'Tues', selected: false },
        { name: 'Wed', selected: false },
        { name: 'Thurs', selected: false },
        { name: 'Fri', selected: false },
        { name: 'Sat', selected: false },
    ];
    const [weekdays, setWeekdays] = useState<Weekday[]>(initialWeekdays);
    const [points, setPoints] = useState(25)
    const [emoji, setEmoji] = useState<string>('');

    const handleEmojiInputChange = (text: string) => {
        const isEmojiOnly = (str: string) => {
            const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
            return regexExp.test(str);
        };
        if (text.length < 2 || isEmojiOnly(text)) {
            setEmoji(text);
        } else {
            Alert.alert('Please enter only one emoji.');
        }
    };
    const handleCreate = async () => {
        setLoading(true);
        
        try {

            const household = await AsyncStorage.getItem(
                'household'
            );
            const parsedDays: Array<number> = []
            weekdays.forEach((day, index) => {
                if (day.selected) {
                    parsedDays.push(index + 1);
                }
            })
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/chore`, {
                name: title,
                description: description,
                householdId: household,
                points: points,
                icon: emoji,
                repetition: {
                    days: parsedDays
                }
            })
            if (res.data) {
                Alert.alert('successully added chore!');
                dispatch(addChore({
                    id: '',
                    name: title,
                    description: description,
                    householdId: '',
                    points: points,
                    icon: emoji
                }));
                refetch();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const toggleWeekday = (index: number) => {
        let newWeekdays = [...weekdays];
        newWeekdays[index].selected = !newWeekdays[index].selected;
        setWeekdays(newWeekdays);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Chore</Text>
            <View style={styles.emojiInputContainer}>
                <Frame style={{ marginTop: 10, marginBottom: 0 }} />
                <Input
                    placeholder='Add Icon'
                    value={emoji}
                    onChangeText={handleEmojiInputChange}
                    style={{
                        fontSize: 15, borderBottomWidth: 0, borderColor: 'transparent', marginBottom: 0
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0, marginBottom: 0 }}
                />
            </View>
            {/* Input for Chore Title */}
            <Input
                style={{ fontSize: 25, margin: 0, fontWeight: "700" }}
                placeholder='Chore Title'
                placeholderTextColor="black"
                onChangeText={(text) => setTitle(text)}
                value={title}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.roundedInput}
            />
            <Text style={styles.label}>Description</Text>
            {/* Input for Chore Description */}
            <Input
                placeholder='Insert description here'
                placeholderTextColor="black"
                onChangeText={(text) => setDescription(text)}
                value={description}
                style={{ fontSize: 15 }}
                containerStyle={styles.inputContainer}
                inputContainerStyle={styles.roundedInput}
            />
            <Text style={styles.label}>Select day(s)</Text>
            {/* Weekday Selector */}
            <View style={styles.weekdayContainer}>
                {weekdays.map((weekday, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.weekdayButton,
                            weekday.selected ? styles.weekdayButtonSelected : null,
                        ]}
                        onPress={() => toggleWeekday(index)}
                    >
                        <Text
                            style={[
                                styles.weekdayText,
                                weekday.selected ? styles.weekdayTextSelected : null,
                            ]}
                        >
                            {weekday.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.label}>Difficulty Level</Text>
            {/* Input for Chore Description */}
            <View style={{ display: "flex", flexDirection: "row", columnGap: 18, marginBottom: 12 }}>
                <TouchableOpacity style={[styles.listItem, styles.listItemShadow, points === 25 ? styles.backgroundSelected : null]} onPress={() => { setPoints(25); }}>
                    <Text style={styles.listItemTitle}>Easy</Text>
                    <Text style={styles.listItemPoints}>+25</Text>
                    <Text style={styles.listItemText}>points</Text>
                    <CheckboxIcon style={{ opacity: points === 25 ? 1 : 0 }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.listItem, styles.listItemShadow, points === 50 ? styles.backgroundSelected : null]} onPress={() => { setPoints(50); }}>
                    <Text style={styles.listItemTitle}>Medium</Text>
                    <Text style={styles.listItemPoints}>+50</Text>
                    <Text style={styles.listItemText}>points</Text>
                    <CheckboxIcon style={{ opacity: points === 50 ? 1 : 0 }} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.listItem, styles.listItemShadow, points === 100 ? styles.backgroundSelected : null]} onPress={() => { setPoints(100); }}>
                    <Text style={styles.listItemTitle}>Hard</Text>
                    <Text style={styles.listItemPoints}>+100</Text>
                    <Text style={styles.listItemText}>points</Text>
                    <CheckboxIcon style={{ opacity: points === 100 ? 1 : 0 }} />
                </TouchableOpacity>
            </View>
            <Button
                style={styles.createButton}
                title="Create"
                onPress={() => {
                    handleCreate();
                }}
            />
        </View >
    );
};

export default AddChores;
