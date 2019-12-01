import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { Header } from "../components/header"
import { CharacterService } from '../services/characterService';
import { IMarvelCharacter } from '../types';



export const CharacterDetailScreen = ({ navigation }) => {
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const name = navigation.getParam('name', 'NO-ID');
    const thumbnail = navigation.getParam('thumbnail', 'NO-ID');
    const [character, setCharacter] = useState<IMarvelCharacter | null>()
    useEffect(() => {
        CharacterService.getCharacterById(itemId).then((result) => {
            setCharacter(result[0])
        })
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }} style={styles.cardImage} />
                <Text style={styles.label}>Name</Text>
                <Text>{name}</Text>
            </View>
            {!!character && !!character.description &&
                <View>
                    <Text style={styles.label}>Description</Text>
                    <Text>{character.description}</Text>
                </View>
            }
            {!!character && !!character.comics &&
                <View>
                    <Text>Number of Comics</Text>
                    <Text>{character.comics.available}</Text>
                </View>
            }
            {!!character && !!character.series &&
                <View>
                    <Text>Number of Series</Text>
                    <Text>{character.series.available}</Text>
                </View>
            }
            {!!character && !!character.stories &&
                <View>
                    <Text>Number of Stories</Text>
                    <Text>{character.stories.available}</Text>
                </View>
            }
            {!!character && !!character.events &&
                <View>
                    <Text>Number of Events</Text>
                    <Text>{character.events.available}</Text>
                </View>
            }
        </View >
    )
}

CharacterDetailScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="CHARACTERS" />,
    headerStyle: {
        backgroundColor: 'red',
    },
    headerTintColor: '#fff',
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardImage: {
        height: 230,
    },
    imageContainer: {

    },
    label: {
        fontFamily: 'space-mono',
        fontSize: 20,
        fontWeight: "900"
    }
});