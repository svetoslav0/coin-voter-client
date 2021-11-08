import React, { useState } from 'react';
import DatePicker from "react-date-picker";
import { addCoin } from "../services/coins";

export const AddCoin = props => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [symbol, setSymbol] = useState('');
    const [launchDate, setLaunchDate] = useState(formatDate(new Date()));

    const [showNameError, setShowNameError] = useState(false);
    const [showSymbolError, setShowSymbolError] = useState(false);
    const [showLaunchDateError, setShowLaunchDateError] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();

        validateNameFiled(name);
        validateSymbolFiled(symbol);
        validateLaunchDateFiled(launchDate);

        const isNameValid = !showNameError;
        const isSymbolValid = !showSymbolError;
        const isDateValid = !showLaunchDateError;

        if (isNameValid && isSymbolValid && isDateValid) {
            console.log(launchDate);
            const coin = {
                name,
                description,
                symbol,
                launch_date: launchDate
            };

            try {
                const result = await addCoin(coin);
            } catch (e) {
                console.log(e);
            }
        }
    }

    const validateNameFiled = value => {
        if (!value) {
            setShowNameError(true);
        } else {
            setShowNameError(false);
        }
    }

    const validateSymbolFiled = value => {
        if (!value) {
            setShowSymbolError(true);
        } else {
            setShowSymbolError(false);
        }

        // todo: check if symbol exists
    }

    const validateLaunchDateFiled = value => {
        // todo: check if date is valid

        if (!value) {
            setShowLaunchDateError(true);
        } else {
            setShowLaunchDateError(false);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                validateNameFiled(value);
                setName(value);
                break;

            case 'symbol':
                validateSymbolFiled(value);
                setSymbol(value);
                break;

            default:

                break;
        }
    }

    const handleDateChange = value => {
        validateLaunchDateFiled(value);

        const date = formatDate(value);
        setLaunchDate(date);
    }

    function formatDate(value) {
        const date = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();

        return `${year}-${month}-${date}`;
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h3 style={{ marginBottom: 30 }}>Add New Coin</h3>

            <form id="add-coin" onSubmit={handleSubmit}>
                <label>
                    <span className="label">
                        Name:
                        <i id="required">*</i>
                    </span>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        onBlur={event => validateNameFiled(event.target.value)}
                    />
                    {
                        showNameError
                        ?
                            <span className="add-coin-error">
                                The name is required!
                            </span>
                        : ''
                    }
                </label>

                <label>
                    <span className="label">
                        Description:
                    </span>
                    <textarea
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    <span className="label">
                        Symbol:
                        <i id="required">*</i>
                    </span>
                    <input
                        name="symbol"
                        type="text"
                        value={symbol}
                        onChange={handleChange}
                        onBlur={event => validateSymbolFiled(event.target.value)}
                    />
                    {
                        showSymbolError
                        ?
                            <span className="add-coin-error">
                                The symbol is required!
                            </span>
                        : ''
                    }
                </label>

                <label>
                    <span className="label">
                        Launch Date:
                        <i id="required">*</i>
                    </span>
                    <DatePicker
                        value={launchDate}
                        onChange={handleDateChange}
                        clearIcon={null}
                        className="add-coin-date-picker"
                        format="y-MM-dd"
                    />
                    {
                        showLaunchDateError
                        ?
                            <span className="add-coin-error">
                                The launch date is required!
                            </span>
                        : ''
                    }
                </label>

                <input type="submit" className="btn btn-success" />
            </form>
        </div>
    );
}
