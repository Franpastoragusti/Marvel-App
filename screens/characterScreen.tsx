import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { IMarvelCharacterProjection } from '../types'
import { StyleSheet, View, Animated, TextInput } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"
export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<IMarvelCharacterProjection[]>([])
    const [offset, setOffset] = useState(0)
    const [searchName, setSearchName] = useState("")
    const scrollOffset = new Animated.Value(0)
    const limit = 5;
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        CharacterService.getCharacters({ limit, offset }).then(charactersList => {
            setCharacters(state => [...state, ...charactersList])
            setLoadingMore(false)
        })
    }, [offset])

    const renderFooter = () => {
        return <View style={styles.loaderContainer}>{loadingMore ? <ActivityIndicator size="large" color="red" /> : null}</View>
    }

    return (
        <View style={styles.container}>
            <Header moveScrollUp={() => ({})} scrollOffset={scrollOffset} />
            <TextInput
                style={styles.searchInput}
                onChangeText={text => setSearchName(text)}
                value={searchName}
            />
            <Animated.FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onEndReachedThreshold={100}
                onEndReached={() => {
                    if (characters.length > 1) {
                        setLoadingMore(true)
                        setOffset(state => state + limit)
                    }
                }}
                data={characters}
                renderItem={({ item }) => <Card
                    content={item.id}
                    title={item.name}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={item.thumbnail} />
                }
                ListFooterComponent={renderFooter}
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
    },
    loaderContainer: {
        height: 200
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: "#FFF"
    }
});