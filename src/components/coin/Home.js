import React, { forwardRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SELECTED_TAB } from '../../common/SELECTED_TAB';

import { CoinsInTable } from './CoinsInTable';

import { searchCoins, getPromotedCoins, vote } from '../../services/coins';
import { getItemFromLocalStorage } from '../../services/helpers/utils';
import { formatDateForBackend } from '../../common/generalUtils';

const DEFAULT_PROMOTED_OFFSET = 5;
const DEFAULT_SEARCH_OFFSET = 10;

export const Home = forwardRef((props, ref) => {
    const [selectedTab, setSelectedTab] = useState(SELECTED_TAB.TODAY);

    const [promotedCoins, setPromotedCoins] = useState([]);
    const [coinsFromToday, setCoinsFromToday] = useState([]);
    const [coinsFromYesterday, setCoinsFromYesterday] = useState([]);
    const [allTimeCoins, setAllTimeCoins] = useState([]);

    const [promotedCoinsMetadata, setPromotedCoinsMetadata] = useState({});
    const [coinsFromTodayMetadata, setCoinsFromTodayMetadata] = useState({});
    const [coinsFromYesterdayMetadata, setCoinsFromYesterdayMetadata] = useState({});
    const [allTimeCoinsMetadata, setAllTimeCoinsMetadata] = useState({});

    const [promotedCoinsOffset, setPromotedCoinsOffset] = useState(0);
    const [coinsFromTodayOffset, setCoinsFromTodayOffset] = useState(0);
    const [coinsFromYesterdayOffset, setCoinsFromYesterdayOffset] = useState(0);
    const [allTimeCoinsOffset, setAllTimeCoinsOffset] = useState(0);

    const history = useHistory();

    useEffect(() => {
        fetchPromotedCoins();
        fetchCoinsFromToday();
    }, []);

    // useImperativeHandle(ref, () => ({
    //     fetchAllTimeCoins
    // }));

    // Fetchers
    const fetchPromotedCoins = async (isAfterVote = false) => {
        const { offset, limit } = buildOffsetAndLimitParamsForFetching(promotedCoinsOffset, isAfterVote, DEFAULT_PROMOTED_OFFSET);

        const response = await getPromotedCoins(offset, limit);
        setPromotedCoins(response.coins);
        updatePromotedMetadata(response);
    }

    const fetchCoinsFromToday = async (isAfterVote = false) => {
        setSelectedTab(SELECTED_TAB.TODAY);
        const { offset, limit } = buildOffsetAndLimitParamsForFetching(coinsFromTodayOffset, isAfterVote, DEFAULT_SEARCH_OFFSET);

        const date = formatDateForBackend(new Date());
        const response = await searchCoins(true, date, offset, limit);
        setCoinsFromToday(response.coins);
        updateCoinsFromTodayMetadata(response);
    };

    const fetchCoinsFromYesterday = async (isAfterVote = false) => {
        setSelectedTab(SELECTED_TAB.YESTERDAY);
        const { offset, limit } = buildOffsetAndLimitParamsForFetching(coinsFromYesterdayOffset, isAfterVote, DEFAULT_SEARCH_OFFSET);

        const date = new Date();
        date.setDate(date.getDate() - 1);
        const formattedDate = formatDateForBackend(date);
        const response = await searchCoins(true, formattedDate, offset, limit);
        setCoinsFromYesterday(response.coins);
        updateCoinsFromYesterdayMetadata(response);
    };

    const fetchAllTimeCoins = async (isAfterVote = false) => {
        setSelectedTab(SELECTED_TAB.ALL_TIME);
        const { offset, limit } = buildOffsetAndLimitParamsForFetching(allTimeCoinsOffset, isAfterVote, DEFAULT_SEARCH_OFFSET);

        const response = await searchCoins(true, null, offset, limit);
        setAllTimeCoins(response.coins);
        updateAllTimeCoinsMetadata(response);
    };

    const buildOffsetAndLimitParamsForFetching = (coinOffset, isAfterVote, defaultOffset) => {
        let offset = coinOffset;
        let limit = null;
        if (isAfterVote) {
            offset = 0;
            limit = coinOffset + defaultOffset;
        }

        return { offset, limit };
    }

    // Handlers
    const handleShowMorePromoted = async () => {
        const newOffset = promotedCoinsOffset + DEFAULT_PROMOTED_OFFSET;
        setPromotedCoinsOffset(newOffset);

        const coinsData = await getPromotedCoins(newOffset);

        updatePromotedMetadata(coinsData);

        const currentList = promotedCoins.concat(coinsData.coins);
        setPromotedCoins(currentList);
    };

    const handleShowMoreCoinsFromToday = async () => {
        const newOffset = coinsFromTodayOffset + DEFAULT_SEARCH_OFFSET;
        setCoinsFromTodayOffset(newOffset);

        const date = formatDateForBackend(new Date());
        const coinsData = await searchCoins(true, date, newOffset);
        updateCoinsFromTodayMetadata(coinsData);

        const currentList = coinsFromToday.concat(coinsData.coins);
        setCoinsFromToday(currentList)
    };

    const handleShowMoreCoinsFromYesterday = async () => {
        const newOffset = coinsFromYesterdayOffset + DEFAULT_SEARCH_OFFSET;
        setCoinsFromYesterdayOffset(newOffset);

        const date = new Date();
        date.setDate(date.getDate() - 1);
        const formattedDate = formatDateForBackend(date);
        const coinsData = await searchCoins(true, formattedDate, newOffset);
        updateCoinsFromYesterdayMetadata(coinsData);

        const currentList = coinsFromYesterday.concat(coinsData.coins);
        setCoinsFromYesterday(currentList);
    };

    const handleShowMoreAllTimeCoins = async () => {
        const newOffset = allTimeCoinsOffset + DEFAULT_SEARCH_OFFSET;
        setAllTimeCoinsOffset(newOffset);

        const coinsData = await searchCoins(true, null, newOffset);
        updateAllTimeCoinsMetadata(coinsData);

        const currentList = allTimeCoins.concat(coinsData.coins);
        setAllTimeCoins(currentList);
    };

    // Updaters
    const updatePromotedMetadata = data => {
        setPromotedCoinsMetadata(buildMetadata(data));
    };

    const updateCoinsFromTodayMetadata = data => {
        setCoinsFromTodayMetadata(buildMetadata(data));
    };

    const updateCoinsFromYesterdayMetadata = data => {
        setCoinsFromYesterdayMetadata(buildMetadata(data));
    };

    const updateAllTimeCoinsMetadata = data => {
        setAllTimeCoinsMetadata(buildMetadata(data));
    };

    const buildMetadata = data => {
        return {
            total: data.total,
            count: data.count,
            offset: data.offset
        };
    }

    const handleVote = async (id, updatePromotedCoins = false) => {
        const token = getItemFromLocalStorage('token');
        if (!token) {
            return history.push('/login');
        }

        await vote(id);

        if (updatePromotedCoins) {
            await fetchPromotedCoins(true);
        }

        switch (selectedTab) {
            case SELECTED_TAB.TODAY:
                await fetchCoinsFromToday(true);
                break;
            case SELECTED_TAB.YESTERDAY:
                await fetchCoinsFromYesterday(true);
                break;
            case SELECTED_TAB.ALL_TIME:
                await fetchAllTimeCoins(true);
                break;
            default:
                break;
        }
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h3 style={{marginBottom: 30}}>Promoted Coins</h3>

            <CoinsInTable
                coinsList={promotedCoins}
                coinsMetadata={promotedCoinsMetadata}
                coinsData={promotedCoins}
                handleVote={handleVote}
                getAdditionalCoinsMethod={handleShowMorePromoted}
                updatePromotedCoins={true}
            />

            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                            onClick={fetchCoinsFromToday}
                            className="nav-link active"
                            id="home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#home"
                            type="button"
                            role="tab"
                            aria-controls="home"
                            aria-selected="true">
                        Added Today
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                            onClick={fetchCoinsFromYesterday}
                            className="nav-link"
                            id="profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile"
                            type="button"
                            role="tab"
                            aria-controls="profile"
                            aria-selected="false">
                        Added Yesterday
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                            onClick={fetchAllTimeCoins}
                            className="nav-link"
                            id="contact-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#contact"
                            type="button"
                            role="tab"
                            aria-controls="contact"
                            aria-selected="false">
                        All Time
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                    <CoinsInTable
                        coinsList={coinsFromToday}
                        coinsMetadata={coinsFromTodayMetadata}
                        handleVote={handleVote}
                        getAdditionalCoinsMethod={handleShowMoreCoinsFromToday}
                    />

                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <CoinsInTable
                        coinsList={coinsFromYesterday}
                        coinsMetadata={coinsFromYesterdayMetadata}
                        handleVote={handleVote}
                        getAdditionalCoinsMethod={handleShowMoreCoinsFromYesterday}
                    />

                </div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                    <CoinsInTable
                        coinsList={allTimeCoins}
                        coinsMetadata={allTimeCoinsMetadata}
                        handleVote={handleVote}
                        getAdditionalCoinsMethod={handleShowMoreAllTimeCoins}
                    />

                </div>
            </div>
        </div>
    );
});
