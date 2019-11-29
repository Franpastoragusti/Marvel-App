import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { ICharacter } from '../types'
import { StyleSheet, Text, View } from 'react-native';

export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([])


    useEffect(() => {
        CharacterService.getAllCharacters().then(charactersList => {
            setCharacters(charactersList.results)
        })
    }, [])

    return (
        <View style={styles.container}>
            {characters.map(character => <Text key={character.id}>{character.name}</Text>)}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});