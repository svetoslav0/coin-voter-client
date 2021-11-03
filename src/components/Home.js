import React, { useEffect, useState } from "react";

import { getApprovedCoins } from "../services/coins";

function Home() {
    const [coins, setCoins] = useState([]);

    const getCoins = async () => {
        setCoins(await getApprovedCoins());
    };

    useEffect(() => {
        getCoins();
    }, []);

    return (
        <div style={{ marginTop: 50 }}>
            <h3 style={{marginBottom: 30}}>Home</h3>

            <table className="table table-striped">
                <tbody>
                    {coins.map(c => {
                        return (
                            <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.symbol}</td>
                                <td>{c.launch_date}</td>
                                <td>
                                    <button className={c.has_upvoted ? "upvote-btn upvoted" : "upvote-btn"}>
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
}

export default Home;
