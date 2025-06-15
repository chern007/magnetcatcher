import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { getSeriesMeta, extractEpisodes } from '../api/cinemeta';

// Screen that shows the list of episodes for a given season
// and navigates to Streams with the correct episode number.

export type EpisodesScreenProps = NativeStackScreenProps<RootStackParamList, 'Episodes'>;

export default function EpisodesScreen({ route, navigation }: EpisodesScreenProps) {
  const { imdbId, season, title } = route.params;
  const [episodes, setEpisodes] = useState<{ episode: number; title: string }[]>([]);

  useEffect(() => {
    getSeriesMeta(imdbId).then(meta => setEpisodes(extractEpisodes(meta, season)));
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: '#121212' }}
      data={episodes}
      keyExtractor={e => e.episode.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ padding: 16, borderBottomWidth: 1, borderColor: '#333' }}
          onPress={() =>
            navigation.navigate('Streams', {
              imdbId,
              season,
              episode: item.episode,
              title: `${title} · E${item.episode}`,
            })
          }
        >
          <Text style={{ color: '#fff' }}>{`E${item.episode} · ${item.title}`}</Text>
        </TouchableOpacity>
      )}
      ListHeaderComponent={<Text style={{ color: '#aaa', padding: 16 }}>{title}</Text>}
      ListEmptyComponent={
        <Text style={{ color: '#999', padding: 16 }}>Loading episodes…</Text>
      }
    />
  );
}
