import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./singleCharPage.scss";

const SingleCharPage = () => {
  const { charID } = useParams();
  const [char, setChar] = useState();
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charID]);

  const updateChar = () => {
    if (!charID) return;

    clearError();
    getCharacter(charID)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, View, char)}
    </>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail } = data;
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
