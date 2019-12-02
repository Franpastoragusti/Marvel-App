import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, Platform, Linking, Alert, Button } from 'react-native';
import { Header } from "../components/header"
import { CharacterService } from '../services/characterService';
import { IMarvelCharacter } from '../types';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from "../constants/layout"
import { Ionicons } from '@expo/vector-icons';


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

    const InfoBlock = () => <View style={styles.infoContainer}>
        <View >
            <Text style={styles.infoLabel}>NAME</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.infoValue, styles.wrapped]}>{name}</Text>
        </View>
        <View>
            <Text style={styles.infoLabel}>ID</Text>
            <Text style={styles.infoValue}>{itemId}</Text>
        </View>
    </View>

    const handleLink = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open URI: ${url}`)
            }
        });
    };


    const IconsBlock = () => {
        const { comics, series, stories, events } = character

        let config = [
            { name: "COMICS", value: comics, icon: "book" },
            { name: "SERIES", value: series, icon: "filing" },
            { name: "STORIES", value: stories, icon: "bookmarks" },
            { name: "EVENTS", value: events, icon: "bookmark" }].filter(item => !!item.value)

        return <View style={styles.iconsContainer}>
            {config.map(item => <View style={styles.iconItemContainer} key={item.name}>

                <Text style={styles.iconItemText}>{item.name}</Text>
                <Ionicons
                    name={
                        Platform.OS === 'ios'
                            ? `ios-${item.icon}`
                            : `md-${item.icon}`
                    }
                    size={26}
                    color="#b30000"
                />
                <Text style={styles.iconItemNumber}>{item.value.available}</Text>
            </View>)
            }
        </View>
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <ImageBackground source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }} style={styles.backgroundImage} />
                    <InfoBlock />
                </View>

                {!!character &&
                    <View style={styles.scrollContainer}>
                        <IconsBlock />
                        < View>
                            <Text style={styles.label}>DESCRIPTION</Text>
                            <Text style={styles.infoValue}>{!!character.description ? character.description : "No description found"}</Text>
                        </View>
                        < View>
                            <Text style={styles.label}>LINKS</Text>
                            {character.urls &&
                                character.urls.length > 0 &&
                                character.urls.map((url, i) =>
                                    <View key={i} style={{ paddingBottom: 10, paddingTop: 10 }}>
                                        <Button
                                            title={url.type.toUpperCase()}
                                            color="#ea2328"
                                            onPress={() => handleLink(url.url)}
                                        />
                                    </View>
                                )
                            }
                        </View>
                    </View>
                }
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
    },
    imageContainer: {
        height: 250,
        position: "relative"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'center',
    },
    infoLabel: {
        fontFamily: 'space-mono',
        fontSize: 18,
        color: "#394251",
        fontWeight: "500",
    },
    label: {
        fontFamily: 'space-mono',
        fontSize: 18,
        color: "#394251",
        fontWeight: "500",
        marginTop: 20
    },
    wrapped: {
        maxWidth: Layout.window.width - 100,
    },
    infoValue: {
        color: "#394251",
        fontSize: 18,
        fontFamily: 'space-mono',
    },
    infoContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height: 70,
        backgroundColor: "rgba(238, 235, 250, 0.9)",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    scrollContainer: {
        padding: 10
    },
    iconsContainer: {
        width: Layout.window.width - 20,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height: 70
    },
    iconItemContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    iconItemText: {
        color: "#394251",
        fontSize: 10,
        fontFamily: 'space-mono',
    },
    iconItemNumber: {
        color: "#394251",
        fontSize: 10,
        fontWeight: "900",
        fontFamily: 'space-mono'
    }
});