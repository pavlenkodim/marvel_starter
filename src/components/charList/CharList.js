import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharCards()
    }

    onLoadedChars = (charList) => {
        this.setState({
            charList,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    updateCharCards = () => {
        this.setState({loading: true})
        this.marvelService
            .getAllCharacters()
            .then(this.onLoadedChars)
            .catch(this.onError);
    }

    render() {
        const {charList, loading, error} = this.state;

        const charListItems = charList.map(item => {
            return <CharCard key={item.id} char={item} />
        })

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? charListItems : null;

        // console.log(charList);

        return (
            <div className="char__list">
                <ul className="char__grid" style={loading ? {gridTemplateColumns: 'auto'} : null}>
                    {spinner}
                    {errorMessage}
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharCard = ({char}) => {
    const {name, thumbnail} = char;
    return(
        <li className="char__item">
            <img src={thumbnail} alt={name} style={thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : null}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;