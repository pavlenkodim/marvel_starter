import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
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
        const {charList, offset, newItemLoading, charEnded} = this.state;

        return (
            <div className="char__list">
                {this.renderItems(charList)}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}} 
                    onClick={() => this.onRequest(offset)} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;