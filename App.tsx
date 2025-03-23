import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import LogOut from "./pages/LogOut";
import LogIn from "./pages/LogIn";
import Button from "./components/Button";
import Welcome from "./pages/Welcome";
import SearchIcon from "./assets/search.svg";
import NetworkIcon from "./assets/network.svg";
import ProfileIcon from "./assets/profile.svg";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import SignUpStep1 from "./pages/SignUpStep1";
import SignUpStep2 from "./pages/SignUpStep2";
import Network from "./pages/Network";

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = { fontFamily: "Chalkboard SE" };

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.style = { fontFamily: "Chalkboard SE" };

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DummyScreen = ({ title }: { title: string }) => (
  <View style={styles.center}>
    <Text>{title} Screen</Text>
  </View>
);

const HomeTabs = ({
  user,
  setUser,
}: {
  user: string;
  setUser: (user: string | null) => void;
}) => (
  <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
    <Tab.Screen
      name="Search"
      children={() => <Search />}
      options={{
        tabBarIcon: ({ color }) => <SearchIcon color={color} height={40} />,
      }}
    />

    <Tab.Screen
      name="Network"
      children={() => <Network />}
      options={{
        tabBarIcon: ({ color }) => <NetworkIcon color={color} height={40} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      children={() => <Profile />}
      options={{
        tabBarIcon: ({ color }) => <ProfileIcon color={color} height={40} />,
      }}
    />
    <Tab.Screen
      name="Logout"
      children={() => <LogOut setUser={setUser} />}
      options={{
        tabBarIcon: ({ color }) => <ProfileIcon color={color} height={40} />,
      }}

    />
  </Tab.Navigator>
);

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    setUser(storedUser);
    setLoading(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <HomeTabs user={user} setUser={setUser} />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login">
              {() => <LogIn onLogin={checkLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUpStep1" component={SignUpStep1} />
            <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
