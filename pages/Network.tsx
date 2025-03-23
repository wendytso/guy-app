import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import Contact from "../components/Contact";
import NetworkList from "../components/NetworkList";

const Network = () => {
    const [contacts, setContacts] = useState([]);
    const [user, setUser] = useState<string | null>(null);
    const [connections, setConnections] = useState([])
    const fetchUsers = async () => {
        const phone = await AsyncStorage.getItem("user");
        const res = await fetch(`https://2890-128-189-236-142.ngrok-free.app/users/${phone}/connections`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setConnections(data.connections.map((connection: any, index: number) => {
            return connection.name
        }));
        console.log(connections)
    }
    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync();
                if (data.length > 0) {
                    setContacts(data as any);
                    const phone = await AsyncStorage.getItem("user");
                    const connection_phones = [] as string[]
                    data.forEach((connection: any, index: number) => {
                        connection?.phoneNumbers?.forEach((phone_number: any) => {
                            if (phone_number?.digits) {
                                connection_phones.push(phone_number?.digits)
                            }
                        })
                    })
                    console.log(connection_phones)
                    const res = await fetch(`https://2890-128-189-236-142.ngrok-free.app/users/${phone}/add`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ "connections": connection_phones }),
                    });
                    fetchUsers()
                }
            }
        })();
    }, []);
    const keyExtractor = (item: any, idx: any) => {
        return item?.id?.toString() || idx.toString();
    };
    const renderItem = ({ item, index }: { item: any, index: any }) => {
        return <Contact contact={item} />;
    };
    return (
        <NetworkList names={connections} />
        // <FlatList
        //     data={connections}
        //     renderItem={renderItem}
        //     keyExtractor={keyExtractor}
        //     style={styles.list}
        // />
    );
};
const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
});
export default Network;
