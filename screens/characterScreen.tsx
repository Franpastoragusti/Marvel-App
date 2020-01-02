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
    const [nameStartsWith, setName] = useState("")
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        getCharacters({ offset, limit, nameStartsWith })
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
        getCharacters({ offset, limit, nameStartsWith: "" }, true)
    }

    const searchByName = () => {
        if (offset === 0) {
            getCharacters({ offset, limit, nameStartsWith }, true)
        } else {
            setOffset(0)
        }
    }

    const getCharacters = (params, reset = false) => {

        CharacterService.getCharacters(params).then(charactersList => {
            if (charactersList.length === 0) {
                showAlert()
            }
            if (reset) {
                setCharacters(charactersList)
            } else {
                setCharacters(state => [...state, ...charactersList])
            }
            setLoadingMore(false)
        })
    }

    return (
        <View style={styles.container}>
            <SearchBar
                text={nameStartsWith}
                setText={(text) => setName(text)}
                search={() => searchByName()}
            />
            <FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onEndReachedThreshold={500}
                onEndReached={() => {
                    if (characters.length > 1 && nameStartsWith === "") {
                        setLoadingMore(true)
                        setOffset(state => state + limit)
                    }
                }}
                data={characters}
                renderItem={({ item }) => <Card
                    big={false}
                    storage="favCharacters"
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
    }
});