import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Button from "../components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  guyItem: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  guyText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

const Saved = () => {
  // mocking data for testing
  const mockGuys = [
    "John Doe - 123-456-7890",
    "Jane Smith - 987-654-3210",
    "Alice Johnson - 555-123-4567",
    "Bob Brown - 444-777-8888",
    "Charlie Davis - 333-444-5555",
  ];

  const [guys, setGuys] = useState<string[]>(mockGuys);

  const handleClearGuys = () => {
    setGuys([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.guyText}>Saved Guys</Text>
      <FlatList
        data={guys}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.guyItem}>
            <Text style={styles.guyText}>{item}</Text>
          </View>
        )}
      />
      {guys.length > 0 && (
        <View style={styles.buttonContainer}>
          <Button title="Clear All Guys" onPress={handleClearGuys} />
        </View>
      )}
    </View>
  );
};

export default Saved;
