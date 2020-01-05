import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack"
import { CharacterScreen } from "../screens/characterScreen"
import { CharacterDetailScreen } from "../screens/characterDetailScreen"
import { ComicScreen } from '../screens/comicScreen';
import { ComicDetailScreen } from '../screens/comicDetailScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "react-native";


const CharacterStack = createStackNavigator({
    CharaterScreen: CharacterScreen,
    CharacterDetail: CharacterDetailScreen,
}, {
    headerLayoutPreset: 'center',
});

const ComicStack = createStackNavigator({
    ComicScreen: ComicScreen,
    ComicDetail: ComicDetailScreen,
}, {
    headerLayoutPreset: 'center',
});


export default createAppContainer(createBottomTabNavigator(
    {
        CharacterScreen: CharacterStack,
        ComicScreen: ComicStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'CharacterScreen') {
                    iconName = Platform.OS === 'ios'
                        ? `ios-people`
                        : `md-people`
                } else if (routeName === 'ComicScreen') {
                    iconName = Platform.OS === 'ios'
                        ? `ios-book`
                        : `md-book`
                }

                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeBackgroundColor: "red",
            inactiveBackgroundColor: "white",
            activeTintColor: 'white',
            inactiveTintColor: 'red',
        },
    }
));
