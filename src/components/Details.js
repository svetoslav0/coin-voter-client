import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { getCoinById, vote } from '../services/coins';

export const Details = props => {
    const history = useHistory();

    const [coin, setCoin] = useState(null);
    const [launchDateString, setLaunchDateString] = useState("");
    const [hasUpvoted, setHasUpvoted] = useState(false);

    let { id } = useParams();

    const getCoin = async () => {
        const currentCoin = await getCoinById(id);
        setCoin(currentCoin);

        const date = new Date(currentCoin.launch_date);
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDay();
        const year = date.getFullYear();

        const dateAsString = `${month} ${day}, ${year}`;
        setLaunchDateString(dateAsString);

        setHasUpvoted(currentCoin.has_upvoted);
    };

    useEffect(() => {
        getCoin();
    }, []);

    const handleVote = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            return history.push('/login');
        }

        await vote(id);
        await getCoin();
    };

    return (
        <div style={{ marginTop: 50 }}>
            <div className="row">
                <div className="col-3">
                    {
                        coin?.logo_url
                        ? <img src={coin?.logo_url} alt="Logo" />
                        : <img style={{width: "100%"}} src="/images/default_coin.jpg" alt="Logo" />
                    }

                </div>
                <div className="col-8 offset-1">
                    <div className="row">
                        <div className="col-8">
                            <h3>{coin?.name}</h3>
                            <div>
                                Binance Chain:&nbsp;
                                <span className="contract-address">
                                    {
                                        coin?.contract_address
                                            ? coin?.contract_address
                                            : <i>No chain was specified.</i>
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="col-4">
                            <button onClick={() => handleVote(coin.id)} className={hasUpvoted ? "upvote-btn upvoted" : "upvote-btn"}>
                                <i className="fas fa-arrow-up" /> <br />
                                {coin?.votes_count}
                            </button>
                        </div>
                    </div>


                    <div className="coin-details-fragment row">
                        <div className="col-6">
                            <div>Price</div>
                            <div>
                                <strong>
                                    ${coin?.price ?? 0}
                                </strong>
                            </div>
                        </div>
                        <div className="col-6">
                            <a href={coin?.website}>
                                <i className="fas fa-globe social-media-icon" />
                            </a>

                            <a href={coin?.telegram}>
                                <i className="fab fa-telegram-plane social-media-icon" />
                            </a>

                            <a href={coin?.twitter}>
                                <i className="fab fa-twitter social-media-icon" />
                            </a>
                        </div>
                    </div>

                    <div className="coin-details-fragment row">
                        <div className="col-4">
                            <div>
                                Market Cap
                            </div>
                            <div>
                                <strong>
                                    ${coin?.market_cap ?? 0}
                                </strong>
                            </div>
                        </div>
                        <div className="col-4">
                            <div>
                                Launch Date
                            </div>
                            <div>
                                <strong>
                                    {launchDateString}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="coin-details-fragment" style={{color: "#798796"}}>
                        {ReactHtmlParser(coin?.description)}
                    </div>
                </div>
            </div>
        </div>
    );
}
