import { Link, useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const SingleCharPage = () => {
    const { charID } = useParams();
    const [char, setChar] = useState();
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [charID]);

    const updateComic = () => {
        if (!charID) return;

        clearError();
        getCharacter(charID).then(onCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    return (
        <>
            <AppBanner />
            {loading ? <Spinner /> : null}
            {error ? <ErrorMessage /> : null}
            {!error && !loading && char ? View(char) : null}
        </>
    );
};

const View = (char) => {
    const { title, description, thumbnail } = char;

    <div className="single-comic">
        <img src={thumbnail} alt={title} className="single-comic__img" />
        <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
        <Link to="/comics" className="single-comic__back">
            Back to all
        </Link>
    </div>;
};

export default SingleCharPage;
