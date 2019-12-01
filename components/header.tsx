import React from 'react'
import { StyleSheet, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import Layout from "../constants/layout"

interface IProps {
    scrollOffset: number;
    moveScrollUp: () => void
}

export const Header = ({ scrollOffset, moveScrollUp }) => {
    return (
        <TouchableWithoutFeedback onPress={() => moveScrollUp()}>
            <View style={styles.header}>
                <Image style={styles.headerImage} source={require('../assets/images/marvelIcon.png')}></Image>
                <Animated.View style={[styles.textContainer, {
                    height: scrollOffset.interpolate({
                        inputRange: [0, 200],
                        outputRange: [60, 30],
                        extrapolate: 'clamp',
                    })
                }]}>
                    <Animated.Text
                        style={[styles.headerText, {
                            fontSize: scrollOffset.interpolate({
                                inputRange: [0, 200],
                                outputRange: [30, 20],
                                extrapolate: 'clamp',
                            })
                        }]}
                    >
                        CHARACTERS
                </Animated.Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback >
    )
}


const styles = StyleSheet.create({
    header: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "red",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    headerImage: {
        height: 50,
        width: 100,
        resizeMode: "contain"
    },
    headerText: {
        fontSize: 30,
        color: "#eeebfa",
        fontFamily: 'space-mono',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: "center",
        paddingHorizontal: Layout.window.width * 0.05,
        width: Layout.window.width,
        height: 60,
    }
});