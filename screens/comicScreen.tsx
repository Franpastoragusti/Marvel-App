import React, { useState, useEffect } from 'react'
import { ComicService } from '../services/comicService'
import { IMarvelComicProjection } from '../types'
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
    const [titleStartsWith, setTitle] = useState("")
    const [loadingMore, setLoadingMore] = useState(true);

    useEffect(() => {
        getComics({ offset, limit, titleStartsWith })
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
        getComics({ offset, limit, titleStartsWith: "" }, true)
    }

    const searchByName = () => {
        if (offset === 0) {
            getComics({ offset, limit, titleStartsWith }, true)
        } else {
            setOffset(0)
        }
    }

    const getComics = (params, reset = false) => {
        ComicService.getComics(params).then(newComicList => {
            if (newComicList.length === 0) {
                showAlert()
            }
            if (reset) {
                setComics(newComicList)
            } else {
                setComics(state => [...state, ...newComicList])
            }

            setLoadingMore(false)
        })
    }

    return (
        <View style={styles.container}>
            <SearchBar
                text={titleStartsWith}
                setText={(text) => setTitle(text)}
                search={() => searchByName()}
            />
            <FlatList
                style={styles.flatList}
                scrollEventThrottle={1}
                onEndReachedThreshold={500}
                onEndReached={() => {
                    if (comics.length > 1 && titleStartsWith === "") {
                        setLoadingMore(true)
                        setOffset(state => state + limit)
                    }
                }}
                data={comics}
                renderItem={({ item }) => <Card
                    big={false}
                    storage="favComics"
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
    }
});