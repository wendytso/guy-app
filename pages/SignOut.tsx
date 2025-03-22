import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ISignOut {
  refetch: () => void;
}

const SignOut = ({ refetch }: ISignOut) => {

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem(
        'user'
      );
      await AsyncStorage.removeItem(
        'household');
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { handleSignOut(); }, [])

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default SignOut;
