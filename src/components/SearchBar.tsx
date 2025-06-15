import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }: {
  value: string;
  onChange: (t: string) => void;
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search series…"
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 8,
    color: '#fff',
    backgroundColor: '#222',
    margin: 12,
  },
});
