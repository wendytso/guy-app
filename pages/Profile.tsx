import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  const [user, setUser] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const phone = await AsyncStorage.getItem("user");
      if (!phone) return;
      setUser(phone);

      try {
        const res = await fetch(`https://2890-128-189-236-142.ngrok-free.app/users/${phone}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    getUserProfile();
  }, []);

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.subtext}>
            lives in {profile.location?.toLowerCase() || "somewhere"}
          </Text>
          <Text style={styles.subtext}>20 km away</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>availability</Text>
            <Text style={styles.sectionText}>
              i work 9–5, but i’m usually free afterwards!
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>skills/hobbies</Text>
            <View style={styles.tagsContainer}>
              {profile.skills?.map((skill: string, idx: number) => (
                <View key={idx} style={styles.tag}>
                  <Text style={styles.tagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    height: 300,
    backgroundColor: "#EA625C",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontFamily: "Chalkboard SE",
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "lowercase",
  },
  subtext: {
    fontSize: 14,
    marginBottom: 2,
    fontFamily: "Chalkboard SE",
    color: "#333",
  },
  section: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: "Chalkboard SE",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    textTransform: "lowercase",
  },
  sectionText: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
    color: "#333",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#fafafa",
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontFamily: "Chalkboard SE",
    fontSize: 14,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Search;
