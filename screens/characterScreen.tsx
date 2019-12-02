import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { IMarvelCharacterProjection } from '../types'
import { StyleSheet, View, TextInput, ActivityIndicator, Platform, Alert, FlatList } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"
import { Ionicons } from '@expo/vector-icons';
interface IProps {
    navigation: any
}

export const CharacterScreen = ({ navigation }: IProps) => {


    const [characters, setCharacters] = useState<IMarvelCharacterProjection[]>([])
    const [offset, setOffset] = useState(0)
    const [name, setName] = useState("")
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
                        setLoadingMore(true)
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
        return <View style={styles.loaderContainer}>{loadingMore ? <ActivityIndicator size="large" color="#ea2328" /> : null}</View>
    }

    const searchByName = () => {
        if (offset === 0 || name === "") {
            getCharacters({ offset, limit, name })
        } else {
            setOffset(0)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setName(text)}
                    value={name}
                    onSubmitEditing={() => searchByName()}
                />
                <View style={styles.searchIcon}>
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? `ios-search`
                                : `md-search`
                        }
                        size={30}
                        color="#FFFFFF"
                    />
                </View>
            </View>
            <FlatList
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
                    navigation={navigation}
                    id={item.id}
                    title={item.name}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={item.thumbnail} />
                }
                ListFooterComponent={renderFooter}
                keyExtractor={(character) => String(character.id)}
            />
        </View >
    )
}


CharacterScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="CHARACTERS" />,
    headerStyle: {
        backgroundColor: '#ea2328',
    },
    headerTintColor: '#fff',
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        padding: 10,
        paddingTop: 10,
    },
    searchBarContainer: {
        padding: 10,
        paddingTop: 5,
        position: "relative"
    },
    searchInput: {
        height: 50,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'space-mono',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: "#FFF"
    },
    searchIcon: {
        position: "absolute",
        top: 5,
        right: 10,
        backgroundColor: "#ea2328",
        height: 50,
        width: 50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'gray',
        borderWidth: 1,
    },
    loaderContainer: {
        height: 200
    }
});