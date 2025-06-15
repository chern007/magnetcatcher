import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { fetchShow, extractSeasons } from '../api/tmdb';

type Props = NativeStackScreenProps<RootStackParamList, 'Seasons'>;
export default function SeasonsScreen({ route, navigation }: Props) {
  const { imdbId, tmdbId, title } = route.params;
  const [seasons, setSeasons] = useState<number[]>([]);

  useEffect(() => {
    fetchShow(tmdbId).then(show => setSeasons(extractSeasons(show)));
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: '#121212' }}
      data={seasons}
      keyExtractor={n => n.toString()}
      renderItem={({ item: season }) => (
        <TouchableOpacity
          style={{ padding: 16, borderBottomWidth: 1, borderColor: '#333' }}
          onPress={() =>
            navigation.navigate('Episodes', {
              imdbId,
              tmdbId,
              season,
              title: `${title} · S${season}`
            })
          }
        >
          <Text style={{ color: '#fff' }}>Season {season}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={{ color: '#999', padding: 16 }}>Loading seasons…</Text>
      }
    />
  );
}
