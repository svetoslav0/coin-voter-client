import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { keywordSearch } from '../../services/coins';

import './SearchBar.css';

const ESC_KEY_CODE = 27;

export const SearchBar = () => {
    const history = useHistory();
    const [showResults, setShowResults] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [resultList, setResultList] = useState([]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        setKeyword(value);

        if (value) {
            setShowResults(true);

            const result = await keywordSearch(value);
            setResultList(result.coins);
        } else {
            setShowResults(false);
        }
    };

    const handleInputBlur = async event => {
        const id = event?.relatedTarget?.dataset?.id;
        if (id) {
            setKeyword('');
            history.push(`/coin/${id}`);
        }

        setShowResults(false);
    };

    const handleInputFocus = () => {
        if (keyword) {
            setShowResults(true);
        }
    };

    const handleKeyPressed = event => {
        if (event.keyCode === ESC_KEY_CODE) {
            setShowResults(false);
        }
    };

    return (
        <div>
            <input
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onKeyUp={handleKeyPressed}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
            />

            {
                showResults &&
                    <div className="search-results">
                        {resultList.map(c => {
                            return (
                                <div key={c.id} className="search-result-element">
                                    <div data-id={c.id} tabIndex="0">
                                        <img style={{width: '36px'}} src={c.logo_url ?? '/images/default_coin.jpg'} alt="coin logo"/>
                                        <strong>
                                            {c.name}
                                        </strong>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            }
        </div>
    );
};
