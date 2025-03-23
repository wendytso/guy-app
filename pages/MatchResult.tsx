import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const MatchResult = ({ route, navigation }: any) => {
    const { match, next_matches } = route.params;
    const { matched_user, matched_skills, path } = match;

    const targetName = matched_user.name.split(' ')[0]?.toLowerCase();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Fullscreen Intro Section */}
            <View style={[styles.fullscreenIntro, { height: SCREEN_HEIGHT }]}>
                <Text style={styles.headline}>we found a guy!</Text>

                {path.length == 0 ? (
                    <Text style={styles.path}>
                        You know <Text style={styles.nameRed}>{targetName}</Text>!
                    </Text>
                ) : (
                    <Text style={styles.path}>
                        You know <Text style={styles.nameBlue}>{path[0]}</Text>
                        {path.map((name: string, index: number) => {
                            if (index > 0)
                                return (
                                    <Text key={index}>
                                        {' '}
                                        who knows <Text style={styles.nameBlue}>{name}</Text>
                                    </Text>
                                );
                        })}
                        {' '}who knows a guy named <Text style={styles.nameRed}>{targetName}</Text>!
                    </Text>
                )}

                <Text style={styles.viewProfile}>view profile</Text>
                <Text style={styles.downArrow}>⌄</Text>
            </View>

            {/* Scrollable Profile Section */}


            <View style={{ "width": "100%" }}>
                <View style={styles.profile_container}>
                    <Image
                        style={styles.photo}
                        source={{
                            uri: matched_user.photo || "https://firebasestorage.googleapis.com/v0/b/biztech-bot.appspot.com/o/profiles%2F4.jpg?alt=media&token=d38c973e-231b-433f-b4e3-b2d5aaa66a24",
                        }}
                    />
                    <View style={styles.info_container}>

                        <Text style={styles.name}>{matched_user.name.toLowerCase()}</Text>
                        <Text style={styles.location}>lives in {matched_user.location.toLowerCase()}</Text>
                        <Text style={styles.distance}>2 km away</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>availability</Text>
                    <Text style={styles.sectionText}>I work 9-5 but Im usually free!</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>skills/hobbies</Text>
                    <View style={styles.bubbleContainer}>
                        {matched_user.skills.map((item: string, index: number) => (
                            <View key={index} style={styles.bubble}>
                                <Text style={styles.bubbleText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <Pressable style={styles.callButton}><Text style={styles.callButtonText}>call now</Text></Pressable>
                    <Pressable style={styles.bookmark}><Ionicons name="bookmark-outline" size={24} color="black" /></Pressable>
                </View>
                {next_matches?.length > 0 &&
                    <Text style={styles.secondaryBtn} onPress={() => navigation.navigate('MatchResult', { match: next_matches[0], next_matches: next_matches.slice(1) })}>find me another guy!</Text>
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bubbleContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
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
    info_container: {
        display: "flex",
        margin: "auto",
        justifyContent: "center",
        marginLeft: 20
    },
    profile_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignContent: "center",
    },
    avatar_container: {
        width: "25%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    fullscreenIntro: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    headline: {
        fontFamily: 'Chalkboard SE',
        fontSize: 36,
        marginBottom: 10,
    },
    path: {
        fontFamily: 'Chalkboard SE',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 100,
    },
    nameBlue: { color: 'blue' },
    nameRed: { color: 'red' },
    viewProfile: {
        fontSize: 20,
        fontFamily: 'Chalkboard SE',
        marginBottom: 5,
    },
    downArrow: {
        fontSize: 20,
        fontFamily: 'Chalkboard SE',
        marginBottom: 10,
    },
    profileCard: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        backgroundColor: '#e76561',
        marginBottom: 20,
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: "#ddd",
        marginTop: 30,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontFamily: 'Chalkboard SE',
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        marginBottom: 2,
    },
    distance: {
        fontSize: 12,
        marginBottom: 12,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontFamily: 'Chalkboard SE',
    },
    sectionText: {
        fontSize: 14,
        fontFamily: 'Chalkboard SE',
    },
    bubbleRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    bubble: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 8,
        marginBottom: 8,
    },
    bubbleText: {
        fontFamily: 'Chalkboard SE',
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 16,
    },

    callButton: {
        backgroundColor: '#77EF7F',
        width: 200,
        alignItems: "center",
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

    callButtonText: {
        fontSize: 18,
        fontFamily: 'Chalkboard SE',
        color: 'white',
        fontWeight: 'bold',
    },

    bookmark: {
        marginLeft: 12,
        backgroundColor: '#f4f4f4',
        borderRadius: 50,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    secondaryBtn: {
        fontSize: 14,
        fontFamily: 'Chalkboard SE',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
});

export default MatchResult;
