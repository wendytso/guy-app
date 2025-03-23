import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Props {
    names: string[];
}

const groupNames = (names: string[]) => {
    const sorted = names.sort((a, b) => a.localeCompare(b));
    const grouped: Record<string, string[]> = {};

    sorted.forEach((name) => {
        const letter = name[0].toLowerCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(name);
    });

    return grouped;
};

const NetworkList: React.FC<Props> = ({ names }) => {
    const grouped = groupNames(names);
    const sections = Object.keys(grouped).sort();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>contacts</Text>
            {sections.map((letter) => (
                <View key={letter} style={styles.section}>
                    <Text style={styles.sectionHeader}>{letter}</Text>
                    {grouped[letter].map((name, idx) => (
                        <Text key={idx} style={styles.name}>
                            {name.toLowerCase()}
                        </Text>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: "Chalkboard SE",
        fontWeight: "bold",
        marginBottom: 16,
        textTransform: "lowercase",
    },
    section: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 8,
    },
    sectionHeader: {
        fontSize: 16,
        fontFamily: "Chalkboard SE",
        fontWeight: "bold",
        textTransform: "lowercase",
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontFamily: "Chalkboard SE",
        paddingVertical: 2,
    },
});

export default NetworkList;
