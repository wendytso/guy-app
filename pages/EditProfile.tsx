import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Image,
    Modal,
    TouchableOpacity,
    FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PhotoIcon from "../assets/photo.svg"
import { Camera } from "expo-camera";
import { uploadFirebase } from "../lib/uploadFirebase";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [availability, setAvailability] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState("");
    const [photo, setPhoto] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [userPhone, setUserPhone] = useState("");

    useEffect(() => {
        (async () => {
            const phone = await AsyncStorage.getItem("user");
            if (!phone) return;
            setUserPhone(phone);

            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${phone}`);
            const data = await res.json();
            const [first, last] = data.user_data.name.split(" ");
            setFirstName(first);
            setLastName(last);
            setAvailability(data.user_data.availability || "");
            setSkills(data.user_data.skills || []);
            setPhoto(data.user_data.photo || null);
        })();
    }, []);

    const handleSave = async () => {
        const imageUrl = photo?.startsWith("http") ? photo : await uploadFirebase(photo || "", userPhone);
        const body = {
            name: `${firstName} ${lastName}`,
            availability,
            skills,
            photo: imageUrl,
        };
        await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userPhone}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled) setPhoto(result.assets[0].uri);
        setModalVisible(false);
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled) setPhoto(result.assets[0].uri);
        setModalVisible(false);
    };

    const removeSkill = (index: number) => {
        const updated = [...skills];
        updated.splice(index, 1);
        setSkills(updated);
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>edit profile</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={{ uri: photo || undefined }} style={styles.avatar} />
                {/* <PhotoIcon style={styles.cameraIcon} /> */}
                <Ionicons name="camera" size={20} style={styles.cameraIcon} />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="first name"
            />
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="last name"
            />
            <TextInput
                style={styles.input}
                value={availability}
                onChangeText={setAvailability}
                placeholder="availability"
                multiline
            />

            <Text style={styles.label}>skills/hobbies</Text>
            <View style={styles.skillsRow}>
                {skills.map((skill, idx) => (
                    <View key={idx} style={styles.skillChip}>
                        <Text style={styles.skillText}>{skill}</Text>
                        <Pressable onPress={() => removeSkill(idx)}>
                            <Text style={styles.removeSkill}>✕</Text>
                        </Pressable>
                    </View>
                ))}
                <TextInput
                    style={[styles.skillChip, { paddingHorizontal: 12 }]}
                    placeholder="+"
                    value={newSkill}
                    onChangeText={setNewSkill}
                    onSubmitEditing={addSkill}
                />
            </View>

            <Pressable onPress={handleSave} style={styles.saveBtn}>
                <Text style={styles.saveText}>save changes</Text>
            </Pressable>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalCard}>
                        <Pressable onPress={pickImage} style={styles.modalOption}>
                            <Ionicons name="image-outline" size={20} />
                            <Text>choose from library</Text>
                        </Pressable>
                        <Pressable onPress={takePhoto} style={styles.modalOption}>
                            <Ionicons name="camera-outline" size={20} />
                            <Text>take photo</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 25, backgroundColor: '#f2f2f2' },
    title: { fontFamily: 'Chalkboard SE', fontSize: 22, textAlign: 'center', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 25,
        padding: 12,
        marginBottom: 10,
        fontFamily: 'Chalkboard SE',
    },
    label: { fontFamily: 'Chalkboard SE', marginBottom: 6 },
    skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    skillChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    skillText: { fontFamily: 'Chalkboard SE' },
    removeSkill: { marginLeft: 8 },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#ddd',
        alignSelf: 'center',
        marginBottom: 20,
    },
    cameraIcon: {
        position: 'absolute',
        right: 115,
        top: 55,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5
    },
    saveBtn: {
        backgroundColor: '#77EF7F',
        paddingVertical: 12,
        borderRadius: 999,
        alignItems: 'center',
        marginTop: 30,
    },
    saveText: { fontFamily: 'Chalkboard SE', fontSize: 16, color: '#000' },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
    },
});

export default EditProfile;