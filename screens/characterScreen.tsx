import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { ICharacter } from '../types'
import { StyleSheet, View, Image, Animated } from 'react-native';
import Layout from "../constants/layout"
import { Header } from "../components/header"
import { Card } from "../components/card"
export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const scrollOffset = new Animated.Value(0)

    useEffect(() => {
        CharacterService.getAllCharacters().then(charactersList => {
            setCharacters(charactersList.results)
        })
    }, [])

    return (
        <View style={styles.container}>
            <Header scrollOffset={scrollOffset} />
            <Animated.ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                scrollEventThrottle={1}
                onScroll={
                    Animated.event([{
                        nativeEvent: { contentOffset: { y: scrollOffset } }
                    }])
                }
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
            </Animated.ScrollView>
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
    }
});