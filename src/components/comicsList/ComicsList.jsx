import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsListEnded, setComicsListEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 8);
        setComicsListEnded(ended);
    };

    const renderItems = (array) => {
        const items = array.map((item) => (
            <li key={item.id} className="comics__item">
                <Link to={`/comics/${item.id}`}>
                    <img
                        src={item.thumbnail}
                        alt="ultimate war"
                        className="comics__item-img"
                    />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        ));
        return <ul className="comics__grid">{items}</ul>;
    };

    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            {renderItems(comicsList)}
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
