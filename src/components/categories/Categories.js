import React, { useEffect, useState } from 'react';
import {useHistory, useParams} from 'react-router-dom';

import { CoinsInTable } from '../coin/CoinsInTable';

import { getItemFromLocalStorage } from '../../services/helpers/utils';
import { getAllCategories } from '../../services/categories';
import { removeVote, searchCoins, vote } from '../../services/coins';

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [coinsInCategory, setCoinsInCategory] = useState([]);
    const [coinsMetadata, setCoinsMetadata] = useState({});

    const history = useHistory();
    let { id: idParam } = useParams();

    const buildMetadata = data => {
        return {
            total: data.total,
            count: data.count,
            offset: data.offset
        };
    }

    const init = async () => {
        console.log(idParam);
        const categoriesList = await getAllCategories();
        setCategories(categoriesList);
        setSelectedCategory(idParam);
        await fetchCoinsForCategory(idParam);
    };

    const fetchCoinsForCategory = async (id, updateUrl = false) => {
        if (updateUrl) {
            history.push(`/categories/${id}`);
        }

        const coinsData = await searchCoins(true, null, id);
        idParam = id;

        setCoinsInCategory(coinsData);
        setCoinsMetadata(buildMetadata(coinsData));
        setSelectedCategory(id);
    }

    useEffect(() => {
        init();
    }, []);

    const handleVote = async id => {
        const token = getItemFromLocalStorage('token');
        if (!token) {
            return history.push('/login');
        }

        await vote(id);
        await fetchCoinsForCategory(selectedCategory);
    };

    const handleRemoveVote = async id => {
        const token = getItemFromLocalStorage('token');
        if (!token) {
            return history.push('/login');
        }

        await removeVote(id);
        await fetchCoinsForCategory(selectedCategory);
    };

    const handleShowMoreAllTimeCoins = () => {
        throw new Error('Not implemented yet, will be after fixing GH-10 on the server');
    };

    return (
        <div>
            <h2 style={{marginTop: '50px'}}>
                View coins by categories
            </h2>

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {
                    categories.map(c => {
                        return (
                            <li className="nav-item" role="presentation" key={c.id}>
                                <button
                                    onClick={() => fetchCoinsForCategory(c.id, true)}
                                    className={"nav-link " + (c.id == idParam ? "active" : "")}
                                    id={`${c.name}-tab`}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#${c.name}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={c.name}
                                    aria-selected="true">
                                    {c.name}
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
            <div className="tab-content" id="myTabContent">
                {
                    categories.map(c => {
                        return (
                            <div
                                className={"tab-pane fade show " + (c.id == idParam ? "active" : "")}
                                id={c.name}
                                role="tabpanel"
                                aria-labelledby={`${c.name}-tab`}
                                key={c.id}>

                                <CoinsInTable
                                    coinsList={coinsInCategory.coins}
                                    coinsMetadata={coinsMetadata}
                                    handleVote={handleVote}
                                    handleRemoveVote={handleRemoveVote}
                                    getAdditionalCoinsMethod={handleShowMoreAllTimeCoins}
                                />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};
