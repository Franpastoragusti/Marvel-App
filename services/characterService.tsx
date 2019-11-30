import { ICharacter, IMarvelResponse } from "../types"
import { MarvelDataSource } from "./marvelDataSource"

interface IAllCharacters extends IMarvelResponse {
    results: ICharacter[]
}

const getCharacters = ({ limit, offset }): Promise<IAllCharacters> => {
    const config = {
        pathName: "characters",
        params: null
    }
    let params = `offset=${offset}`
    if (limit > 0) {
        params = `${params}&limit=${limit}&`
    }
    config.params = params
    console.log(config)

    return MarvelDataSource(config)
}

export const CharacterService = {
    getCharacters
}