import React, { useState, useEffect } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { getUpdatedFavArray, FavCharactersContext } from './contexts';


export const FavCharactersProvider = (props: any) => {
    const store = '@MarvelStore:favCharacters'
    const [favArray, setFavArray] = useState([]);
    const { getValuesFromStorage, setInStorage } = useAsyncStorage()

    useEffect(() => {
        let isSubscribed = true
        getValuesFromStorage(store).then(result => {
            if (isSubscribed) {
                setFavArray(result)
            }
        })
        return () => {
            isSubscribed = false
        }
    }, [])

    const modifyFavArray = (id: number) => {
        let valueUpdated = getUpdatedFavArray(id, favArray)
        setFavArray(valueUpdated)
        setInStorage(store, valueUpdated)
    }

    return (
        <FavCharactersContext.Provider
            value={{
                favArray,
                modifyFavArray,
            }}
        >
            {props.children}
        </FavCharactersContext.Provider>
    );
};




