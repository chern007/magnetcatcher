import { registerRootComponent } from 'expo';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/AppNavigator';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { searchSeriesTMDB } from './src/api/tmdb';

export const searchSeries = (query: string) => searchSeriesTMDB(query);

function Root() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Envuelve el navegador en tema oscuro */}
      <NavigationContainer theme={DarkTheme}>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
});

registerRootComponent(Root);
