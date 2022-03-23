import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { searchCoins, approveCoin, approveAllCoins } from '../../services/coins';

const DEFAULT_LIMIT = 10;

export const UnapprovedCoins = () => {

    const [coins, setCoins] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showMoreButton, setShowMoreButton] = useState(false);

    const fetchCoins = async (newOffset = 0, getNewTable = false) => {

        const result = await searchCoins(false, null, null, newOffset, null, 'date_added');

        const oldList = getNewTable ? [] : coins;
        const newCoinsList = oldList.concat(result.coins);

        setCoins(newCoinsList);

        if (result.total > DEFAULT_LIMIT) {
            setShowMoreButton(true);
        }

        if (+result.offset + +result.count >= +result.total) {
            setShowMoreButton(false);
        }
    };

    useEffect(() => {
        fetchCoins();
    }, []);

    const handleApproveCoins = async id => {
        await approveCoin(id);
        await emptyCoinsList();
        await fetchCoins(0, true);
    };

    const emptyCoinsList = async () => {
        setCoins([]);
    }

    const handleApproveAllCoins = async () => {
        await approveAllCoins();
        await fetchCoins(0, true);
    };

    const handleShowMore = async () => {
        const newOffset = offset + DEFAULT_LIMIT;
        setOffset(newOffset);
        await fetchCoins(newOffset);
    };

    return (
        <div>
            <button className="btn btn-block btn-info" onClick={handleApproveAllCoins}>
                Approve All Coins
            </button>
            {
                !coins.length
                ?
                    <p className="mt-lg-5 text-center">
                        <em>No unapproved coins</em>
                    </p>
                :
                    coins?.map(c =>
                    <div className="row coin-table" key={c.id.toString()}>
                        <div className="col-1 coin-table-element">
                            <Link to={`/coin/${c.id}`} className="coin-table-link">
                                <img src={!c.logo_url ? '/images/default_coin.jpg' : c.logo_url} alt="Coin Logo" style={{height: "48px"}} />
                            </Link>
                        </div>
                        <div className="col-3 coin-table-element">
                            <Link to={`/coin/${c.id}`} className="coin-table-link">
                                <div>
                                    <strong>
                                        {c.name}
                                    </strong>
                                    {
                                        c.is_presale
                                            ? <span className="badge badge-primary presale-badge">Presale</span>
                                            : ''
                                    }
                                </div>
                                <div className="gray-text-100">
                                    {c.symbol}
                                </div>
                            </Link>
                        </div>
                        <div className="col-3 coin-table-element">
                            <Link to={`/coin/${c.id}`} className="coin-table-link">
                                ${c.price ?? "0.00"}
                            </Link>
                        </div>
                        <div className="col-3 coin-table-element">
                            <Link to={`/coin/${c.id}`} className="coin-table-link">
                                {c.launch_date}
                            </Link>
                        </div>
                        <div className="col-2 coin-table-element">
                            <button className="btn btn-info" onClick={() => handleApproveCoins(c.id)}>
                                Approve
                            </button>
                        </div>
                    </div>

            )}
            {
                showMoreButton
                ?
                    <button className='show-more-btn' onClick={handleShowMore}>
                        Show More
                    </button>
                :
                    null
            }

        </div>
    );
}
