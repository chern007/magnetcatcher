import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import SeasonsScreen from './screens/Seasons';
import EpisodesScreen from './screens/Episodes';
import StreamsScreen from './screens/Streams';

export type RootStackParamList = {
  Home: undefined;
  Seasons: { imdbId: string; tmdbId: number; title: string };
  Episodes: { imdbId: string; tmdbId: number; season: number; title: string };
  Streams: {
    imdbId: string; season: number; episode: number; title: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Seasons" component={SeasonsScreen} />
        <Stack.Screen name="Episodes" component={EpisodesScreen} />
        <Stack.Screen name="Streams" component={StreamsScreen} />
      </Stack.Navigator>
  );

  
}
