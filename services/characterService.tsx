import { IMarvelCharacter, IMarvelResponse, IMarvelCharacterProjection } from "../types"
import { MarvelDataSource } from "./marvelDataSource"


const characterListMapper = (characterList: IMarvelCharacter[]): IMarvelCharacterProjection[] => {
    return characterList.map(marvelCharacter => {
        const { id, name, thumbnail } = marvelCharacter
        return { id, name, thumbnail }
    })
}

const getParamsString = (paramsToSet: { [key: string]: string }) => {
    let paramsString = ""
    Object.keys(paramsToSet).forEach(key => {
        if (paramsToSet[key] !== "") {
            paramsString = `${paramsString}&${key}=${paramsToSet[key]}`
        }
    })
    return paramsString.substr(1)
}


const getCharacters = ({ ...params }): Promise<IMarvelCharacterProjection[]> => {
    const config = {
        pathName: "characters",
        params: getParamsString(params)
    }
    return MarvelDataSource(config)
        .then(characterList => characterListMapper(characterList.results))
}

const getCharacterById = (id): Promise<IMarvelCharacter[]> => {
    const config = {
        pathName: `characters/${id}`,
    }
    return MarvelDataSource(config)
        .then(characterList => characterList.results)
}

export const CharacterService = {
    getCharacters,
    getCharacterById
}