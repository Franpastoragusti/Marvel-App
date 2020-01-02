import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Header } from "../components/header"
import { IMarvelComic } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import { ComicService } from '../services/comicService';
import { Card } from '../components/card';
import { InfoBlock } from '../components/infoBlock';


export const ComicDetailScreen = ({ navigation }) => {
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const name = navigation.getParam('name', 'NO-NAME');
    const thumbnail = navigation.getParam('thumbnail', 'NO-THUMB');
    const [comic, setComic] = useState<IMarvelComic | null>()

    useEffect(() => {
        ComicService.getComicsById(itemId).then((result) => {
            setComic(result[0])
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card
                    big={true}
                    storage="favComics"
                    navigation={navigation}
                    id={itemId}
                    title={name}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={thumbnail}
                />
                {!!comic &&
                    <InfoBlock
                        entity={comic}
                        resolver={
                            () => {
                                const { characters, creators, stories, events } = comic
                                return [
                                    { name: "CHARACTERS", value: characters, icon: "book" },
                                    { name: "CREATORS", value: creators, icon: "filing" },
                                    { name: "STORIES", value: stories, icon: "bookmarks" },
                                    { name: "EVENTS", value: events, icon: "bookmark" }].filter(item => !!item.value)
                            }
                        }
                    />}
            </ScrollView>
        </View >
    )
}

ComicDetailScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="COMICS" />,
    headerStyle: {
        backgroundColor: '#ea2328',
    },
    headerTintColor: '#fff',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});