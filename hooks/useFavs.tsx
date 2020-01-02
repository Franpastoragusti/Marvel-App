import { useContext } from 'react';
import { FavCharactersContext, FavComicsContext } from '../providers/contexts';

const useFavs = (store: "favCharacters" | "favComics") => {

    const { modifyFavArray, favArray } = store === "favCharacters"
        ? useContext(FavCharactersContext)
        : useContext(FavComicsContext)


    return {
        modifyFavArray,
        favArray
    };
};

export default useFavs;
