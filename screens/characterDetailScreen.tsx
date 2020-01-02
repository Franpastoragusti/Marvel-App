import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { Header } from "../components/header"
import { CharacterService } from '../services/characterService';
import { IMarvelCharacter } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from '../components/card';
import { InfoBlock } from '../components/infoBlock';


export const CharacterDetailScreen = ({ navigation }) => {
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const name = navigation.getParam('name', 'NO-NAME');
    const thumbnail = navigation.getParam('thumbnail', 'NO-THUMB');
    const [character, setCharacter] = useState<IMarvelCharacter | null>()

    useEffect(() => {
        CharacterService.getCharacterById(itemId).then((result) => {
            setCharacter(result[0])
        })
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card
                    big={true}
                    storage="favCharacters"
                    navigation={navigation}
                    id={itemId}
                    title={name}
                    titleLabel="NAME"
                    contentLabel="ID"
                    thumbnail={thumbnail}
                />
                {!!character &&
                    <InfoBlock
                        entity={character}
                        resolver={
                            () => {
                                const { comics, series, stories, events } = character
                                return [
                                    { name: "COMICS", value: comics, icon: "book" },
                                    { name: "SERIES", value: series, icon: "filing" },
                                    { name: "STORIES", value: stories, icon: "bookmarks" },
                                    { name: "EVENTS", value: events, icon: "bookmark" }].filter(item => !!item.value)
                            }
                        }
                    />}
            </ScrollView>
        </View >
    )
}

CharacterDetailScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="CHARACTERS" />,
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