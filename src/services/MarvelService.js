import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=2d6279c215a48a1a5b9410f438dae894";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
        const res = await request(
            `${_apiBase}characters?name=${name}&${_apiKey}`
        );
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComics = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount
                ? `${comic.pageCount} pages`
                : "No information about the number of pages",
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            language: comic.textObjects.language || "en-us",
            price: comic.prices[0].price
                ? comic.prices[0].price + " $"
                : "not avaible".toUpperCase(),
        };
    };

    return {
        loading,
        error,
        clearError,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getAllComics,
        getComics,
    };
};

export default useMarvelService;
