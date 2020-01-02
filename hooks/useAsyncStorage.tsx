
import { AsyncStorage } from 'react-native';

const useAsyncStorage = () => {

    const setInStorage = (store: string, value: string[]) => {
        AsyncStorage.setItem(store, JSON.stringify(value))
            .catch((e) => {
                console.log(e)
            })
    }

    const getValuesFromStorage = (store) => {
        return AsyncStorage.getItem(store)
            .then((result) => JSON.parse(result))
            .catch((e) => { console.log(e) })
    }

    return {
        setInStorage,
        getValuesFromStorage
    };
};

export default useAsyncStorage;
