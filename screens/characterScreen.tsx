import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { ICharacter } from '../types'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from "../components/card"
export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([])


    useEffect(() => {
        CharacterService.getAllCharacters().then(charactersList => {
            setCharacters(charactersList.results)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CHARACTERS</Text>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    {characters.map(character =>
                        <Card
                            key={character.id}
                            content={character.id}
                            title={character.name}
                            titleLabel="NAME"
                            contentLabel="ID"
                            thumbnail={character.thumbnail}
                        ></Card>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    contentContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        paddingTop: 10,
        color: "#c61fa3",
        alignSelf: "center",
        fontWeight: "700",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,

    }
});