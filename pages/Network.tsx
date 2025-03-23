import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import NetworkList from "../components/NetworkList";

const Network = () => {
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState<string | null>(null);
    const [connections, setConnections] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState("");

    const fetchUsers = async () => {
        const phone = await AsyncStorage.getItem("user");
        setUser(phone);
        const res = await fetch(
            `https://2890-128-189-236-142.ngrok-free.app/users/${phone}/connections`
        );
        const data = await res.json();
        setConnections(data.connections.map((c: any) => c.name));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddConnection = async () => {
        if (!newPhoneNumber || !user) return;

        try {
            const res = await fetch(
                `https://2890-128-189-236-142.ngrok-free.app/users/${user}/add`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ connections: [newPhoneNumber] }),
                }
            );

            if (res.ok) {
                setNewPhoneNumber("");
                setModalVisible(false);
                fetchUsers();
            } else {
                Alert.alert("Error", "Failed to add connection.");
            }
        } catch (err) {
            Alert.alert("Error", "Network error.");
            console.error(err);
        }
    };

    const importContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync();
            if (data.length > 0) {
                setContacts(data as any);
                const phone = await AsyncStorage.getItem("user");
                const connectionPhones: string[] = [];

                data.forEach((contact: any) => {
                    contact?.phoneNumbers?.forEach((num: any) => {
                        if (num?.digits) connectionPhones.push(num.digits);
                    });
                });

                await fetch(
                    `https://2890-128-189-236-142.ngrok-free.app/users/${phone}/add`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ connections: connectionPhones }),
                    }
                );

                fetchUsers();
            }
        }
    };

    useEffect(() => {
        importContacts();
    }, []);

    return (
        <View style={styles.container}>
            <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.addButtonText}>add a new connection</Text>
            </Pressable>

            <NetworkList names={connections} />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Enter phone number</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            placeholder="e.g. 1234567890"
                            value={newPhoneNumber}
                            onChangeText={setNewPhoneNumber}
                        />
                        <View style={styles.modalActions}>
                            <Pressable onPress={handleAddConnection} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>submit</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                            >
                                <Text style={styles.modalButtonText}>cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    addButton: {
        backgroundColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
        alignSelf: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    addButtonText: {
        fontFamily: "Chalkboard SE",
        fontSize: 14,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 20,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontFamily: "Chalkboard SE",
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontFamily: "Chalkboard SE",
    },
    modalActions: {
        flexDirection: "row",
        gap: 10,
    },
    modalButton: {
        backgroundColor: "#77EF7F",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 999,
    },
    modalButtonText: {
        fontFamily: "Chalkboard SE",
        fontSize: 14,
    },
});

export default Network;
