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
        this.getCharCards()
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
    
    getCharCards = () => {
        this.setState({loading: true})
        this.marvelService
            .getAllCharacters()
            .then(this.onLoadedChars)
            .catch(this.onError);
    }

    renderItems(arr) {
        const {loading, error} = this.state;
    
        const items = arr.map(item => {
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                    >
                    <img src={item.thumbnail} alt={item.name} style={item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'unset'} : null}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error) ? items : null;



        return (
            <ul className="char__grid" style={loading ? {gridTemplateColumns: 'auto'} : null}>
                {spinner}
                {errorMessage}
                {content}
            </ul>
        )
    }

    render() {
        const {charList} = this.state;

        // console.log(charList);

        return (
            <div className="char__list">
                {this.renderItems(charList)}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;