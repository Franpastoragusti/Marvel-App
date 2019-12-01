import React from 'react'
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Layout from "../constants/layout"

interface IProps {
    navigation: any
    title: string
}

export const Header = ({ navigation, title }: IProps) => {

    return (
        <TouchableWithoutFeedback>
            <View style={styles.header}>
                <Image style={styles.headerImage} source={require('../assets/images/marvelIcon.png')}></Image>
                <Text style={styles.headerText} >
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback >
    )
}


const styles = StyleSheet.create({
    header: {
        display: "flex",
        alignItems: "center",
    },
    headerImage: {
        height: 40,
        width: 80,
        resizeMode: "contain"
    },
    headerText: {
        fontSize: 12,
        color: "#eeebfa",
        fontFamily: 'space-mono',
    }
});