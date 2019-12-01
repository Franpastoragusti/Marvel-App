import { IMarvelCharacter, IMarvelResponse, IMarvelCharacterProjection } from "../types"
import { MarvelDataSource } from "./marvelDataSource"

interface IAllCharacters extends IMarvelResponse {
    results: IMarvelCharacter[]
}

const characterListMapper = (characterList: IMarvelCharacter[]): IMarvelCharacterProjection[] => {
    return characterList.map(marvelCharacter => {
        const { id, name, description, resourceURI, urls, thumbnail, comics } = marvelCharacter
        return { id, name, description, resourceURI, urls, thumbnail, comics }
    })
}
const getCharacters = ({ limit, offset }): Promise<IMarvelCharacterProjection[]> => {
    const config = {
        pathName: "characters",
        params: null
    }
    let params = `offset=${offset}`
    if (limit > 0) {
        params = `${params}&limit=${limit}&`
    }
    config.params = params

    return MarvelDataSource(config).then(characterList => characterListMapper(characterList.results))
}

export const CharacterService = {
    getCharacters
}