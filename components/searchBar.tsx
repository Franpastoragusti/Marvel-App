import React from 'react'
import { View, TextInput, Platform, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Ionicons } from '@expo/vector-icons'

interface ISearchBar {
    text: string
    setText: (text: string) => void
    search: () => void

}


export const SearchBar = ({ text, setText, search }: ISearchBar) => {

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputText}
                onChangeText={text => setText(text)}
                value={text}
                onSubmitEditing={() => search()}
            />
            <TouchableWithoutFeedback onPress={() => search()}>
                <View style={styles.searchIcon}>
                    <Ionicons
                        name={
                            Platform.OS === 'ios'
                                ? `ios-search`
                                : `md-search`
                        }
                        size={30}
                        color="#FFFFFF"
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 5,
        position: "relative"
    },
    inputText: {
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