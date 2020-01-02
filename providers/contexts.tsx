
import React from "react"

interface IContext {
    favArray: string[];
    modifyFavArray: (id: number) => void;
}

const initialState: IContext = {
    favArray: [],
    modifyFavArray: () => ({})
};


export const getUpdatedFavArray = (id: number, favArray: string[]) => {
    let stringId = String(id)
    let value = []
    if (favArray.indexOf(stringId) < 0) {
        value = [...favArray, stringId]
    } else {
        value = favArray.filter(idSaved => idSaved !== String(id))
    }
    return value
}


export const FavComicsContext = React.createContext(initialState);
export const FavCharactersContext = React.createContext(initialState);