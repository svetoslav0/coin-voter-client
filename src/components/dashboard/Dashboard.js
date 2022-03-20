import React, { useEffect, useState } from 'react';

import { DASHBOARDS } from './DASHBOARDS';
import { Categories } from './Categories';
import { UnapprovedCoins } from './UnapprovedCoins';

export const Dashboard = () => {

    const [selectedDashboard, setSelectedDashboard] = useState(DASHBOARDS.CATEGORIES);
    const [component, setComponent] = useState(null);

    useEffect(() => {
        switch (selectedDashboard) {
            case DASHBOARDS.CATEGORIES:
                setComponent(<Categories />);
                break;
            case DASHBOARDS.UNAPPROVED_COINS:
                setComponent(<UnapprovedCoins />);
                break;
            default:
                console.error('Invalid dashboard selected!');
                break;
        }
    }, [selectedDashboard]);

    const handleChangeDashboard = dashboard => {
        setSelectedDashboard(dashboard);
    }

    return (
        <div className="row" style={{marginTop: '30px'}}>
            <div className="col-md-3">
                <button
                    onClick={() => handleChangeDashboard(DASHBOARDS.CATEGORIES)}
                    className={`btn btn-block ${selectedDashboard === DASHBOARDS.CATEGORIES ? 'btn-info' : 'btn-outline-info'}`}
                >
                    Categories
                </button>
                <button
                    onClick={() => handleChangeDashboard(DASHBOARDS.UNAPPROVED_COINS)}
                    className={`btn btn-block ${selectedDashboard === DASHBOARDS.UNAPPROVED_COINS ? 'btn-info' : 'btn-outline-info'}`}
                >
                    Unapproved coins
                </button>
            </div>
            <div className="col-md-9">
                {component}
            </div>
        </div>
    );
};
