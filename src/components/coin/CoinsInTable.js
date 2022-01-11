import React from 'react';
import { Link } from 'react-router-dom';

export const CoinsInTable = props => {
    const coinsList = props.coinsList ?? [];
    const metadata = props.coinsMetadata ?? {};
    const updatePromotedCoins = props.updatePromotedCoins ?? false;

    const table = coinsList.map(c =>
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
            <div className="col-2">
                <button onClick={() => props.handleVote(c.id, updatePromotedCoins)} className={c.has_upvoted ? "upvote-btn upvoted" : "upvote-btn"}>
                    <i className="fas fa-arrow-up" /> <br />
                    {c.votes}
                </button>
            </div>
        </div>
    );

    const handleShowMore = async () => {
        await props.getAdditionalCoinsMethod();
    }

    const showMore = (
        <button className='show-more-btn' onClick={handleShowMore}>
            Show More
        </button>
    );

    if ((metadata.offset + metadata.count < metadata.total)
            && metadata.total > 0) {
        table.push(showMore);
    }

    const noCoins = (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <em>
                No coins found for the selected period.
            </em>
        </div>
    );

    return (
        coinsList.length !== 0
            ? table
            : noCoins
    );
};
