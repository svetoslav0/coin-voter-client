import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import { getCoinById, vote } from '../../services/coins';
import { getItemFromLocalStorage } from '../../services/helpers/utils';
import { isCurrentUserAdmin } from '../../common/authUtils';
import { formatDateForDetails } from '../../common/generalUtils';

export const Details = props => {
    const history = useHistory();

    const [coin, setCoin] = useState(null);
    const [launchDateString, setLaunchDateString] = useState('');
    const [hasUpvoted, setHasUpvoted] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const [showArchiveButton, setShowArchiveButton] = useState(false);
    const [showUnapprovedCoinMessage, setShowUnapprovedCoinMessage] = useState(false);

    let { id } = useParams();

    const getCoin = async () => {
        const currentCoin = await getCoinById(id);
        checkForCoinApproval(currentCoin);
        setCoin(currentCoin);

        const date = formatDateForDetails(currentCoin.launch_date);
        setLaunchDateString(date);

        setHasUpvoted(currentCoin.has_upvoted);
    };

    useEffect(() => {
        getCoin();
    }, [id]);

    const checkForCoinApproval = (coin) => {
        const isAdmin = isCurrentUserAdmin();
        const isOwner = coin.is_owner;

        if (!isAdmin && !isOwner) {
            return;
        }

        if (!coin.is_approved) {
            setShowUnapprovedCoinMessage(true);
        }

        if (isAdmin) {
            setShowEditButton(true);
            setShowArchiveButton(true);
        }

        if (isOwner) {
            setShowEditButton(true);
        }
    }

    const handleVote = async () => {
        const token = getItemFromLocalStorage('token');
        if (!token) {
            return history.push('/login');
        }

        await vote(id);
        await getCoin();
    };

    return (
        <div style={{ marginTop: 50 }}>
            {
                showUnapprovedCoinMessage
                    ?
                        <div className="alert alert-warning" role="alert">
                            <strong>Warning: </strong> this coin is still not approved and will not be shown anywhere
                        </div>
                    :
                        null
            }


            <div className="row">
                <div className="col-3">
                    {
                        coin?.logo_url
                        ? <img style={{width: "100%"}} src={coin?.logo_url} alt="Logo" />
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

                            {
                                showEditButton
                                    ? <button type="button" className="btn btn-success margin-right-10">Edit</button>
                                    : null
                            }

                            {
                                showArchiveButton
                                    ?
                                    <button
                                        type="button"
                                        className="btn btn-warning"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter">
                                            Archive
                                    </button>
                                    : null
                            }
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

            { /* Archive modal */ }
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">
                                Are you sure you want to archive the coin?
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <strong>Warning:</strong>
                            </p>
                            Archiving the coin will hide it. The coin will not be showing in any of the tables or in the search.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger">Archive Coin</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
