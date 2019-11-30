import React, { useState, useEffect, useCallback } from 'react'
import { CharacterService } from '../services/characterService'
import { ICharacter } from '../types'
import { StyleSheet, View, Image, Animated } from 'react-native';
import Layout from "../constants/layout"
import { Header } from "../components/header"
import { Card } from "../components/card"
export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<ICharacter[]>([])
    const [offset, setOffset] = useState(0)
    const scrollOffset = new Animated.Value(0)
    const limit = 20;
    let hasToCall = true;

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 3000;
    };


    useEffect(() => {
        CharacterService.getCharacters({ limit, offset }).then(charactersList => {
            setCharacters(state => [...state, ...charactersList.results])
        })

    }, [offset])

    const updateOffset = () => {
        setOffset(state => state + limit)
    }


    return (
        <View style={styles.container}>
            <Header scrollOffset={scrollOffset} />
            <Animated.ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                scrollEventThrottle={1}
                onScrollEndDrag={(e) => {
                    if (isCloseToBottom(e.nativeEvent)) {
                        updateOffset()
                    }
                }}
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