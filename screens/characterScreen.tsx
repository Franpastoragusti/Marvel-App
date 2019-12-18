import React, { useState, useEffect } from 'react'
import { CharacterService } from '../services/characterService'
import { IMarvelCharacterProjection } from '../types'
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"
import { Loader } from '../components/loader';
import { SearchBar } from '../components/searchBar';
interface IProps {
    navigation: any
}


export const CharacterScreen = ({ navigation }: IProps) => {
    const limit = 30;
    const [characters, setCharacters] = useState<IMarvelCharacterProjection[]>([])
    const [offset, setOffset] = useState(0)
    const [name, setName] = useState("")
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        getCharacters({ offset, limit, name })
    }, [offset])

    const showAlert = () => {
        Alert.alert(
            'Not Character found',
            'Try to search another',
            [{
                text: 'Reset',
                onPress: () => reset(),
                style: 'cancel',
            },
            { text: 'Ok', onPress: () => { } },
            ],
            { cancelable: false },
        );
    }

    const reset = () => {
        setName("")
        setLoadingMore(true)
        getCharacters({ offset, limit, name: "" })
    }

    const searchByName = () => {
        if (offset === 0 || name === "") {
            getCharacters({ offset, limit, name })
        } else {
            setOffset(0)
        }
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

//Comment
    return (
        <View style={styles.container}>
            <SearchBar
                text={name}
                setText={(text) => setName(text)}
                search={() => searchByName()}
            />
            <FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onEndReachedThreshold={500}
                onEndReached={() => {
                    if (characters.length > 1) {
                        setLoadingMore(true)
                        setOffset(state => state + limit)
                    }
                }}
                data={characters}
                renderItem={({ item }) => <Card
                    navigation={navigation}
                    id={item.id}
                    title={item.name}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={item.thumbnail} />
                }
                ListFooterComponent={<Loader loading={loadingMore} />}
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
    }
});