import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { ICharacter } from '../types'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Layout from "../constants/layout"
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
            <View style={styles.header}>
                <Image style={styles.headerImage} source={require('../assets/images/marvelIcon.png')}></Image>
                <View style={styles.textContainer}>
                    <Text
                        style={styles.headerText}
                    >
                        CHARACTERS
                </Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
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
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 30
    },
    header: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "red",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    headerImage: {
        height: 50,
        width: 100,
        resizeMode: "contain"
    },
    headerText: {
        fontSize: 30,
        color: "#eeebfa",
        fontFamily: 'space-mono',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: Layout.window.width * 0.05,
        width: Layout.window.width,
        height: 60,
    }
});