import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native-paper';
import LogOut from './pages/LogOut';
import LogIn from './pages/LogIn';
import Button from './components/Button';
import Welcome from './pages/Welcome';

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = { fontFamily: 'Chalkboard SE' };

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.style = { fontFamily: 'Chalkboard SE' };

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DummyScreen = ({ title }: { title: string }) => (
  <View style={styles.center}>
    <Text>{title} Screen</Text>
  </View>
);

const HomeTabs = ({ user, setUser }: { user: string, setUser: (user: string | null) => void }) => (
  <Tab.Navigator>
    <Tab.Screen name="Home" children={() => <DummyScreen title="Home" />} />
    <Tab.Screen name="Settings" children={() => <DummyScreen title="Settings" />} />
    <Tab.Screen name="Logout" children={() => <LogOut setUser={setUser} />} />
  </Tab.Navigator>
);

const SignUpScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://2890-128-189-236-142.ngrok-free.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          name,
          password,
          skills: [],
          connections: [],
          location: '',
          photo: '',
        }),
      });

      if (response.ok) {
        await AsyncStorage.setItem('user', phoneNumber);
        onLogin();
      } else {
        const err = await response.text();
        console.error(err);
        alert('Sign up failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error during sign up');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Create Account" onPress={handleSignUp} />
    </View>
  );
};

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    const storedUser = await AsyncStorage.getItem('user');
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
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen onLogin={checkLogin} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20,
  },
  input: {
    height: 50, borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5,
  },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
});

export default App;
