import { ICharacter, IMarvelResponse } from "../types"
import { MarvelDataSource } from "./marvelDataSource"

interface IAllCharacters extends IMarvelResponse {
    results: ICharacter[]
}

const getAllCharacters = (): Promise<IAllCharacters> => {
    const config = {
        pathName: "characters"
    }
    return MarvelDataSource(config)
}

export const CharacterService = {
    getAllCharacters
}