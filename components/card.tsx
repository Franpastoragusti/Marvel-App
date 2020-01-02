import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Platform, ImageBackground } from 'react-native';
import Layout from "../constants/layout"
import { Ionicons } from '@expo/vector-icons'

import { IMarvelImage } from '../types'
import useFavs from '../hooks/useFavs';
interface ICard {
    thumbnail: IMarvelImage
    title: string
    id: number
    contentLabel: string
    titleLabel: string
    navigation: any
    storage: "favCharacters" | "favComics"
    big: boolean
}
export const Card = ({ thumbnail, title, titleLabel, id, contentLabel, navigation, storage, big = false }: ICard) => {


    const { favArray, modifyFavArray } = useFavs(storage)

    const goToDetail = () => {
        if (!big) {
            let goTo = storage === "favCharacters" ? 'CharacterDetail' : 'ComicDetail'
            navigation.navigate(goTo, {
                itemId: id,
                name: title,
                thumbnail: thumbnail
            })
        }
    }

    const getCardDimensions = () => {
        return {
            width: big ? Layout.window.width : Layout.window.width - 30,
            height: big ? 400 : 300,
        }
    }

    const getIcon = () => {
        let isFav = favArray.indexOf(String(id)) !== -1
        let icon = "md-star"
        if (Platform.OS === 'ios') {
            icon = `ios-star`
        }

        if (!isFav) {
            icon = `${icon}-outline`
        }
        return icon
    }

    return (
        <TouchableWithoutFeedback onPress={() => goToDetail()}>
            <View style={styles.container}>
                <View style={[styles.card, getCardDimensions()]}>
                    <View style={styles.star}>
                        <TouchableWithoutFeedback onPress={() => {
                            modifyFavArray(id)
                        }}>
                            <Ionicons
                                name={getIcon()}
                                size={30}
                                color="#FFFFFF"
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <ImageBackground source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }} style={styles.backgroundImage} />

                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.infoLabel}>{titleLabel}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.infoValue, styles.wrapped]}>{title}</Text>
                        </View>
                        <View>
                            <Text style={styles.infoLabel}>{contentLabel}</Text>
                            <Text style={styles.infoValue}>{id}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    star: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 999
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'center',
    },
    card: {
        marginBottom: 20,
        backgroundColor: "#eeebfa",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    cardImage: {
        height: 230,
    },
    contentContainer: {
        marginTop: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    content: {
        fontSize: 18,
        paddingBottom: 10,
        fontFamily: 'space-mono'
    },
    label: {
        fontSize: 12,
        fontWeight: "700",
    },
    wrapped: {
        maxWidth: Layout.window.width - 100,
    },
    infoValue: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'space-mono',
    },
    infoContainer: {
        width: "100%",
        bottom: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        height: 70,
        backgroundColor: "rgba(234, 35, 40, 0.9)",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 2,
    },
    infoLabel: {
        fontFamily: 'space-mono',
        fontSize: 18,
        color: "#fff",
        fontWeight: "500",
    },
});