import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { CharacterScreen } from "../screens/characterScreen"
import { CharacterDetailScreen } from "../screens/characterDetailScreen"

export default createAppContainer(
    createStackNavigator({
        CharacterScreen: { screen: CharacterScreen },
        CharacterDetail: { screen: CharacterDetailScreen },
    }, { headerLayoutPreset: 'center' })
);
