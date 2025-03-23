import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

interface ProfileCardProps {
    name: string;
    location: string;
    distance?: string;
    photo?: string;
    skills?: string[]
    onEditPress?: () => void;
    showEditButton?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    location,
    distance = "2 km away",
    photo,
    skills,
    onEditPress,
    showEditButton = true,
}) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.photo}
                    source={{
                        uri:
                            photo ||
                            "https://firebasestorage.googleapis.com/v0/b/biztech-bot.appspot.com/o/profiles%2F4.jpg?alt=media&token=d38c973e-231b-433f-b4e3-b2d5aaa66a24",
                    }}
                />
                {showEditButton && (
                    <Pressable style={styles.editButton} onPress={onEditPress}>
                        <Text style={styles.editButtonText}>edit profile</Text>
                    </Pressable>
                )}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name.toLowerCase()}</Text>
                <Text style={styles.location}>lives in {location.toLowerCase()}</Text>
                <Text style={styles.distance}>{distance}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>skills/hobbies</Text>
                <View style={styles.bubbleContainer}>
                    {skills?.map((item, index) => (
                        <View key={index} style={styles.bubble}>
                            <Text style={styles.bubbleText}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    avatarContainer: {
        width: 80,
        alignItems: "center",
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: "#ddd",
        marginTop: 30,
        marginBottom: 10,
    },
    editButton: {
        backgroundColor: "#fff",
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 999,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
    },
    editButtonText: {
        fontSize: 12,
        fontFamily: "Chalkboard SE",
    },
    infoContainer: {
        marginLeft: 20,
        justifyContent: "center",
        flex: 1,
    },
    name: {
        fontFamily: "Chalkboard SE",
        fontSize: 24,
        marginBottom: 5,
    },
    location: {
        fontFamily: "Chalkboard SE",
        fontSize: 14,
    },
    distance: {
        fontFamily: "Chalkboard SE",
        fontSize: 12,
        marginBottom: 20,
    },
    bubbleContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 10,
        marginBottom: 10,
    },
    bubbleText: {
        fontFamily: "Chalkboard SE",
        fontSize: 14,
    },
    section: {
        alignSelf: "flex-start",
        marginTop: 20,
        width: "100%",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontFamily: "Chalkboard SE",
        marginBottom: 5,
        fontSize: 14,
    },
    sectionText: {
        fontFamily: "Chalkboard SE",
        fontSize: 14,
    },
});

export default ProfileCard;
