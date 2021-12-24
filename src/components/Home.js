import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { getCoins as fetchCoins, vote } from "../services/coins";
import { useHistory, Link } from "react-router-dom";

export const Home = forwardRef((props, ref) => {
    const [coins, setCoins] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getCoins();
    }, []);

    useImperativeHandle(ref, () => ({
        getCoins
    }));

    const getCoins = async () => {
        setCoins(await fetchCoins(true));
    };

    const handleVote = async id => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            return history.push('/login');
        }

        await vote(id);
        await getCoins();
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h3 style={{marginBottom: 30}}>Home</h3>

            <table className="table table-striped">
                <tbody>
                    {coins.map(c => {
                        return (
                            <tr key={c.id}>
                                <td>
                                    <Link to={`/coin/${c.id}`}>
                                        {c.name}
                                    </Link>
                                </td>
                                <td>{c.symbol}</td>
                                <td>{c.launch_date}</td>
                                <td>
                                    <button onClick={() => handleVote(c.id)} className={c.has_upvoted ? "upvote-btn upvoted" : "upvote-btn"}>
                                        <i className="fas fa-arrow-up"></i> <br />
                                        {c.votes}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
});
