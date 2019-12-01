import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { Header } from "../components/header"



export const CharacterDetailScreen = ({ navigation }) => {
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const name = navigation.getParam('name', 'NO-ID');
    const thumbnail = navigation.getParam('thumbnail', 'NO-ID');

    return (
        <View style={styles.container}>
            <Image source={{ uri: `${thumbnail.path}.${thumbnail.extension}` }} style={styles.cardImage} />
            <Text>{itemId}</Text>
            <Text>{name}</Text>
        </View >
    )
}

CharacterDetailScreen.navigationOptions = {
    headerTitle: (navigation) => <Header navigation={navigation} title="CHARACTERS" />,
    headerStyle: {
        backgroundColor: 'red',
    },
    headerTintColor: '#fff',
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardImage: {
        height: 230,
    },
});