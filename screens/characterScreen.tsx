import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { IMarvelCharacterProjection } from '../types'
import { StyleSheet, View, Animated, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"


export const CharacterScreen = () => {
    const [characters, setCharacters] = useState<IMarvelCharacterProjection[]>([])
    const [offset, setOffset] = useState(0)
    const [name, setName] = useState("")
    const scrollOffset = new Animated.Value(0)
    const limit = 5;
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        getCharacters({ offset, limit, name })
    }, [offset, limit])

    const showAlert = () => {
        Alert.alert(
            'Not Character found',
            'Try to search another',
            [
                {
                    text: 'Reset',
                    onPress: () => {
                        setName("")
                        getCharacters({ offset, limit, name: "" })
                    },
                    style: 'cancel',
                },
                { text: 'Ok', onPress: () => { } },

            ],
            { cancelable: false },
        );
    }

    const getCharacters = (params) => {
        CharacterService.getCharacters(params).then(charactersList => {
            if (charactersList.length === 1 || characters.length === 1) {
                setCharacters(charactersList)
            } else if (charactersList.length === 0 && name !== "") {
                setCharacters([])
                showAlert()
            } else {
                setCharacters(state => [...state, ...charactersList])
            }
            setLoadingMore(false)
        })
    }

    const renderFooter = () => {
        return <View style={styles.loaderContainer}>{loadingMore ? <ActivityIndicator size="large" color="red" /> : null}</View>
    }

    return (
        <View style={styles.container}>
            <Header moveScrollUp={() => ({})} scrollOffset={scrollOffset} />
            <View>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setName(text)}
                    value={name}
                    onSubmitEditing={() => {
                        if (offset === 0 || name === "") {
                            getCharacters({ offset, limit, name })
                        } else {
                            setOffset(0)
                        }
                    }}
                />
            </View>
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
                scrollEnabled={characters.length > 2}
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
            />
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
    searchInput: {
        height: 60,
        paddingLeft: 10,
        fontSize: 30,
        fontFamily: 'space-mono',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: "#FFF"
    },
    loaderContainer: {
        height: 200
    }
});