import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [magnet, setMagnet] = useState<string | null>(null);
  const [torrentPath, setTorrentPath] = useState<string | null>(null);

  /** Procesa cualquier URL entrante */
  const handleUrl = async (url?: string | null) => {
    if (!url) return;

    // Caso 1: enlace magnet puro
    if (url.startsWith('magnet:')) {
      await Clipboard.setStringAsync(url);
      setMagnet(url);
      Alert.alert('¡Magnet copiado!');
      return;
    }

    // Caso 2: enlace a .torrent remoto
    if (url.endsWith('.torrent')) {
      const local = FileSystem.documentDirectory + 'stream.torrent';
      try {
        await FileSystem.downloadAsync(url, local);
        setTorrentPath(local);
        Alert.alert('Torrent guardado', `Ruta: ${local}`);
      } catch (err) {
        Alert.alert('Error al descargar .torrent');
      }
      return;
    }

    if (url.startsWith('content://')) {
      // content URIs necesitan permiso; los copiamos tal cual
      await Clipboard.setStringAsync(url);
      setMagnet(url);
      Alert.alert('Enlace content:// copiado');
      return;
    }

    if (url.startsWith('http')) {
      await Clipboard.setStringAsync(url);
      setMagnet(url);
      Alert.alert('Enlace de vídeo copiado');
      return;
    }

    // Caso 3: magnet incrustado como query (?magnet=...)
    const parsed = Linking.parse(url);
    const embeddedMagnet = parsed.queryParams?.magnet as string | undefined;
    if (embeddedMagnet) {
      await Clipboard.setStringAsync(embeddedMagnet);
      setMagnet(embeddedMagnet);
      Alert.alert('Magnet extraído de la URL');
    }
  };

  /* Escucha intents */
  useEffect(() => {
    Linking.getInitialURL().then(handleUrl);
    const sub = Linking.addEventListener('url', ({ url }: { url: string }) => handleUrl(url));
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magnet Catcher</Text>
      <TextInput
        style={styles.box}
        multiline
        editable={false}
        value={magnet ?? '— Aún no hay enlace —'}
      />
      {torrentPath && <Text style={styles.note}>Torrent en: {torrentPath}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  box: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, minHeight: 120 },
  note: { marginTop: 12, fontSize: 12, color: 'gray' }
});
