import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import RoomRates from './src/screens/RoomRates/RoomRates';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.safe}>
        <RoomRates />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
