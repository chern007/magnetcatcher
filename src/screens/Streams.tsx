import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';
import { getEpisodeStreams, Stream } from '../api/streams';
import * as Clipboard from 'expo-clipboard';

type Props = NativeStackScreenProps<RootStackParamList, 'Streams'>;

function toMagnet(s: any) {
  if (s.url) return s.url;                          // magnet o http torrent
  if (s.infoHash) {
    const track = encodeURIComponent('udp://tracker.openbittorrent.com:6969');
    return `magnet:?xt=urn:btih:${s.infoHash}&tr=${track}&ix=${s.fileIdx ?? 0}`;
  }
  return '';
}

export default function StreamsScreen({ route }: Props) {
  const { imdbId, season, episode, title } = route.params;
  const [streams, setStreams] = useState<Stream[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('No streams yet…');

  useEffect(() => {
    getEpisodeStreams(imdbId, season, episode)
      .then(({ streams: list, errors }) => {
        setStreams(list);
        setErrors(errors);
        if (!list.length) {
          setMessage(
            'No se encontraron streams. Comprueba la conexión o si los add-ons están bloqueados.'
          );
        }
      })
      .catch(err => {
        console.warn('getEpisodeStreams failed', err);
        setMessage('Error al obtener streams: ' + err?.toString?.());
      });
  }, []);

  async function copy(stream: any) {
  const link = toMagnet(stream);
  if (!link) return Alert.alert('Sin enlace', 'El add-on no devolvió URL ni hash.');

  await Clipboard.setStringAsync(link);
  Alert.alert('Copiado 👍', link.startsWith('magnet:') ? 'Magnet en portapapeles' : 'URL copiada');
}

  return (
    <FlatList
      data={streams}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
            style={{ padding: 16, borderBottomWidth: 1, borderColor: '#333' }}
            onPress={() => copy(item)}
        >
            <Text style={{ color: '#fff' }}>
            {item.name ?? item.url ?? item.infoHash}
            {item.language && ` [${item.language.toUpperCase()}]`}
            </Text>
        </TouchableOpacity>
        )}
      ListHeaderComponent={
        <>
          <Text style={{ color: '#aaa', padding: 16 }}>{title}</Text>
          {errors.map((e, i) => (
            <Text key={i} style={{ color: '#f66', paddingHorizontal: 16 }}>{e}</Text>
          ))}
        </>
      }
      ListEmptyComponent={
        <Text style={{ color: '#888', padding: 16 }}>{message}</Text>
      }
    />
  );
}
