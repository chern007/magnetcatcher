import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Text, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import { searchSeries } from '../api/cinemeta';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    async function handleSearch(t: string) {
        setQuery(t);
        if (t.trim().length < 2) return setResults([]);


        const results = await searchSeries(t);
        setResults(results);

        // const apiResults = await searchSeries(t);
        // /* filtro adicional en cliente por si el API da más de la cuenta */
        // const filtered = apiResults.filter(m =>
        //     m.name.toLowerCase().includes(t.trim().toLowerCase())
        // );
        // setResults(filtered);
    }

    return (
        <>
            <SearchBar value={query} onChange={handleSearch} />
            <FlatList
                style={{ backgroundColor: '#121212' }}
                data={results}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ flexDirection: 'row', padding: 10 }}
                        onPress={() =>
                            navigation.navigate('Episodes', {
                                imdbId: item.id,
                                title: item.name,
                                seasons: item.seasons || 1
                            })
                        }
                    >
                        {item.poster &&
                            <Image
                                source={{ uri: item.poster.replace(/\/poster$/, '/poster_medium') }}
                                style={{ width: 60, height: 90, marginRight: 8 }}
                            />
                        }
                        <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </>
    );
}
