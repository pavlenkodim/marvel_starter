import { useEffect, useState } from "react";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsListEnded, setComicsListEded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        console.log("useEffect");
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
        console.log("onRequest");
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicsListEded(ended);
        console.log("onComicsListLoaded");
    };

    const ComicsItem = ({ id, title, thumbnail, price, ...rest }) => {
        return (
            <li key={id} className="comics__item">
                <a href="#">
                    <img
                        src={thumbnail}
                        alt="ultimate war"
                        className="comics__item-img"
                    />
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </a>
            </li>
        );
    };

    const comicsItems = comicsList.map(ComicsItem);
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    console.log("render");
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">{comicsItems}</ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: comicsListEnded ? "none" : "block" }}
                onClick={() => onRequest(offset, false)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
