import React, { useState, useEffect } from 'react'
import { ComicService } from '../services/comicService'
import { IMarvelCharacterProjection, IMarvelComicProjection } from '../types'
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { Header } from "../components/header"
import { Card } from "../components/card"
import { Loader } from '../components/loader';
import { SearchBar } from '../components/searchBar';
interface IProps {
    navigation: any
}


export const ComicScreen = ({ navigation }: IProps) => {
    const limit = 30;
    const [comics, setComics] = useState<IMarvelComicProjection[]>([])
    const [offset, setOffset] = useState(0)
    const [title, setTitle] = useState("")
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        getComics({ offset, limit, title })
    }, [offset])

    const showAlert = () => {
        Alert.alert(
            'Not Comic found',
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
        setTitle("")
        setLoadingMore(true)
        getComics({ offset, limit, title: "" })
    }

    const searchByName = () => {
        if (offset === 0 || title === "") {
            getComics({ offset, limit, title })
        } else {
            setOffset(0)
        }
    }

    const getComics = (params) => {
        ComicService.getComics(params).then(newComicList => {
            if (newComicList.length === 1 || comics.length === 1) {
                setComics(newComicList)
            } else if (newComicList.length === 0 && title !== "") {
                setComics([])
                showAlert()
            } else {
                setComics(state => [...state, ...newComicList])
            }
            setLoadingMore(false)
        })
    }

    return (
        <View style={styles.container}>
            <SearchBar
                text={title}
                setText={(text) => setTitle(text)}
                search={() => searchByName()}
            />
            <FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onEndReachedThreshold={500}
                onEndReached={() => {
                    if (comics.length > 1) {
                        setLoadingMore(true)
                        setOffset(state => state + limit)
                    }
                }}
                data={comics}
                renderItem={({ item }) => <Card
                    navigation={navigation}
                    id={item.id}
                    title={item.title}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={item.thumbnail} />
                }
                ListFooterComponent={<Loader loading={loadingMore} />}
                keyExtractor={(item) => String(item.id)}
            />
        </View >
    )
}


ComicScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="COMICS" />,
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