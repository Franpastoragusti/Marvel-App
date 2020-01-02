import React, { useState, useEffect } from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import { getUpdatedFavArray, FavComicsContext } from './contexts';


export const FavComicsProvider = (props: any) => {
    const [favArray, setFavArray] = useState([]);
    const store = '@MarvelStore:favComics'
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
        <FavComicsContext.Provider
            value={{
                favArray,
                modifyFavArray,
            }}
        >
            {props.children}
        </FavComicsContext.Provider>
    );
};
