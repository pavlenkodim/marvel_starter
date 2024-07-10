import { Link, useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleCharPage.scss";

const SingleCharPage = () => {
    const { charID } = useParams();
    const [char, setChar] = useState();
    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charID]);

    const updateChar = () => {
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
    const { name, description, thumbnail } = char;

    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img" />
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleCharPage;
