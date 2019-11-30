import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Layout from "../constants/layout"

import { IMarvelImage } from '../types'
interface ICard {
    thumbnail: IMarvelImage
    title: string,
    content: number
    contentLabel: string
    titleLabel: string
}
export const Card = ({ thumbnail, title, titleLabel, content, contentLabel }: ICard) => {
    return (
        <View style={styles.container}>
            <View
                style={styles.card}
            >
                <Image source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }} style={styles.cardImage} />
                <View
                    style={styles.contentContainer}
                >
                    <View>
                        <Text style={styles.label}>{titleLabel}</Text>
                        <Text style={styles.content}>{title}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>{contentLabel}</Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: Layout.window.width - 30,
        height: 300,
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
    }
});