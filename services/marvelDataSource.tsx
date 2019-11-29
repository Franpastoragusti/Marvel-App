import CryptoJS from "crypto-js"
import { IMarvelResponse } from "../types"
const PUBLIC_KEY = "156d63b5be37a3a559312c5e7f0bbbe5"
const PRIVATE_KEY = "eca02da53af793af00c21e627d66e17cbc79f2a1"
const BASE_URL = "http://gateway.marvel.com/v1/public"

interface IMarvelProps {
    pathName: string
}
export const MarvelDataSource = ({ pathName }: IMarvelProps): Promise<IMarvelResponse> => {
    const ts = Date.now()
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    var url = `${BASE_URL}/${pathName}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`

    return fetch(url)
        .then(response => response.json())
        .then(jsonResponse => jsonResponse.data)
        .catch(e => console.warn(e))
}