import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const CustomTextInput = (props: TextInputProps) => {
  return (
    <TextInput
      placeholderTextColor="#777"
      {...props}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#eee',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Chalkboard SE', 
    color: '#555',
    marginVertical: 6,
  },
});

export default CustomTextInput;
