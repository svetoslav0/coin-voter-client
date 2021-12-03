import React, {useEffect, useState} from 'react';
import { getCoins as fetchCoins } from "../services/coins";

export const Requests = props => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        getCoins();
    }, []);

    const getCoins = async () => {
        setCoins(await fetchCoins(false));
    };

    return (
        <div>
            <h1>Requests</h1>

            <table className="table table-striped">
                <tbody>
                {coins.map(c => {
                    return (
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.symbol}</td>
                            <td>{c.launch_date}</td>
                            <td>
                                <button className="btn btn-success">
                                    Approve
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>

            <button className="btn btn-success btn-lg btn-block">
                Approve All
            </button>

        </div>
    );
};
