import { useParams, Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./singleComicPage.scss";
import xMen from "../../resources/img/x-men.png";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

const SingleComicPage = () => {
    const { comicID } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, getComics, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicID]);

    const updateComic = () => {
        if (!comicID) return;

        clearError();
        getComics(comicID).then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    return (
        <>
            {loading ? <Spinner /> : null}
            {error ? <ErrorMessage /> : null}
            {!error && !loading && comic ? View(comic) : null}
        </>
    );
};

const View = (comic) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
