import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import AppNavigation from './navigation/appNavigation';
import { FavComicsProvider } from './providers/favComicsProvider';
import { FavCharactersProvider } from './providers/favCharactersProvider';


const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/background.png'),
        require('./assets/images/marvelIcon.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  const handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  const handleFinishLoading = (setLoadingComplete) => {
    setLoadingComplete(true);
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <FavCharactersProvider>
          <FavComicsProvider>
            <AppNavigation />
          </FavComicsProvider>
        </FavCharactersProvider>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 40,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',
  }
});


export default App