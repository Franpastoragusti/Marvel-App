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
    Object.keys(paramsToSet).forEach(key => paramsString = `${paramsString}&${key}=${paramsToSet[key]}`)
    console.log(paramsString.substr(1))
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

export const CharacterService = {
    getCharacters
}