import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { IMarvelCharacter, IMarvelCharacterProjection } from '../types'
import { StyleSheet, View, Animated } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"
export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<IMarvelCharacterProjection[]>([])
    const [offset, setOffset] = useState(0)
    const scrollOffset = new Animated.Value(0)
    const limit = 30;

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - 6000;
    };

    useEffect(() => {
        CharacterService.getCharacters({ limit, offset }).then(charactersList => {
            setCharacters(state => [...state, ...charactersList])
        })

    }, [offset])

    const updateOffset = () => {
        setOffset(state => state + limit)
    }

    return (
        <View style={styles.container}>
            <Header moveScrollUp={() => ({})} scrollOffset={scrollOffset} />
            <Animated.FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onScrollEndDrag={(e) => {
                    if (isCloseToBottom(e.nativeEvent)) {
                        updateOffset()
                    }
                }}
                data={characters}
                renderItem={({ item }) => {
                    return <Card
                        content={item.id}
                        title={item.name}
                        titleLabel="NAME"
                        contentLabel="ID"
                        thumbnail={item.thumbnail} />
                }}
                keyExtractor={(character) => String(character.id)}
                onScroll={
                    Animated.event([{
                        nativeEvent: { contentOffset: { y: scrollOffset } }
                    }])
                }
            >
            </Animated.FlatList>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        paddingTop: 30
    }
});