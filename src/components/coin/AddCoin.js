import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { formatDateForBackend } from '../../common/generalUtils';

import { addCoin } from '../../services/coins';

export const AddCoin = props => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [marketCap, setMarketCap] = useState('');
    const [launchDate, setLaunchDate] = useState(new Date());
    const [isPresale, setIsPresale] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
    const [website, setWebsite] = useState('');
    const [telegram, setTelegram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [logo, setLogo] = useState('');

    const [showNameError, setShowNameError] = useState(false);
    const [showSymbolError, setShowSymbolError] = useState(false);
    const [showLaunchDateError, setShowLaunchDateError] = useState(false);
    const [showWebsiteError, setShowWebsiteError] = useState(false);

    const [descriptionEditor, setDescriptionEditor] = useState(EditorState.createEmpty());

    const handleSubmit = async event => {
        event.preventDefault();

        validateNameFiled(name);
        validateSymbolFiled(symbol);
        validateDescription(description);
        validatePrice(price);
        validateMarketCap(marketCap);
        validateLaunchDateFiled(launchDate);
        validateContractAddress(contractAddress);
        validateWebsiteField(website);
        validateTelegram(telegram);
        validateTwitter(twitter);
        validateLogo(logo);

        const isNameValid = !showNameError;
        const isSymbolValid = !showSymbolError;
        const isDateValid = !showLaunchDateError;

        if (isNameValid && isSymbolValid && isDateValid) {
            const rawContentState = convertToRaw(descriptionEditor.getCurrentContent());
            const descriptionAsMarkup = draftToHtml(
                rawContentState,
                {
                    trigger: '#',
                    separator: ' '
                },

            );

            const coin = {
                name,
                description: descriptionAsMarkup,
                symbol,
                launch_date: formatDateForBackend(launchDate),
                logo_url: logo,
                is_presale: isPresale,
                price,
                market_cap: marketCap,
                website,
                telegram,
                twitter,
                contract_address: contractAddress
            };

            try {
                await addCoin(coin);
                history.push('/');
            } catch (e) {
                // todo: add some general error
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
    }

    const validateDescription = value => {
        // todo: implement description validation
    }

    const validatePrice = value => {
        // todo: implement price validation
    }

    const validateMarketCap = value => {
        // todo: implement market cap validation
    }

    const validateLaunchDateFiled = value => {
        // todo: check if date is valid

        if (!value) {
            setShowLaunchDateError(true);
        } else {
            setShowLaunchDateError(false);
        }
    }

    const validateContractAddress = value => {
        // todo: implement contract address validation
    }

    const validateWebsiteField = value => {
        if (!value) {
            setShowWebsiteError(true);
        } else {
            setShowWebsiteError(false);
        }
        // todo: validate website as string
    }

    const validateTelegram = value => {
        // todo: validate telegram value
    }

    const validateTwitter = value => {
        // todo: validate twitter value
    }

    const validateLogo = value => {
        // todo: validate logo value
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

            case 'description':
                validateDescription(value);
                setDescription(value);
                break;

            case 'price':
                validatePrice(value);
                setPrice(value);
                break;

            case 'marketCap':
                validateMarketCap(value);
                setMarketCap(value);
                break;

            case 'contractAddress':
                validateContractAddress(value);
                setContractAddress(value);
                break;

            case 'website':
                validateWebsiteField(value);
                setWebsite(value);
                break;

            case 'telegram':
                validateTelegram(value);
                setTelegram(value);
                break;

            case 'twitter':
                validateTwitter(value);
                setTwitter(value);
                break;

            case 'logo':
                validateLogo(value);
                setLogo(value);
                break;

            default:
                console.log(`Trying to handle invalid field: ${name}`);
                break;
        }
    }

    const handleDateChange = value => {
        validateLaunchDateFiled(value);

        setLaunchDate(value);
    }

    const handleCheckbox = e => {
        setIsPresale(e.target.checked);
    }

    const handleDescriptionEditorChange = state => {
        setDescriptionEditor(state);
    }

    return (
        <div style={{ marginTop: 50 }}>
            <h3 style={{ marginBottom: 30 }}>Add New Coin</h3>
            <hr />

            <form id="add-coin" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-5">
                        <h4>Basic Information</h4>
                        <label htmlFor="name">
                            Name
                            <i className="required">*</i>
                        </label>
                        <input
                            id="name"
                            className="input-field"
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                            onBlur={e => validateNameFiled(e.target.value)}
                        />
                        {
                            showNameError
                                ?
                                    <span className="add-coin-error">
                                        The name is required!
                                    </span>
                                : ''
                        }

                        <label htmlFor="symbol">
                            Symbol
                            <i className="required">*</i>
                        </label>

                        <input
                            id="symbol"
                            className="input-field"
                            name="symbol"
                            type="text"
                            value={symbol}
                            onChange={handleChange}
                            onBlur={e => validateSymbolFiled(e.target.value)}
                        />
                        {
                            showSymbolError
                                ?
                                    <span className="add-coin-error">
                                        The symbol is required!
                                    </span>
                                : ''
                        }

                        <label htmlFor="description">
                            Description
                        </label>

                        <div className="description">
                            <Editor
                                editorState={descriptionEditor}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                placeholder="Add some description here..."
                                onEditorStateChange={handleDescriptionEditorChange}
                            />
                        </div>

                        <label htmlFor="price">
                            Price
                        </label>
                        <input
                            id="price"
                            className="input-field"
                            type="number"
                            name="price"
                            value={price}
                            onChange={handleChange}
                            onBlur={e => validatePrice(e.target.value)}
                        />

                        <label htmlFor="marketCap">
                            Market Cap
                        </label>
                        <input
                            id="marketCap"
                            className="input-field"
                            type="number"
                            name="marketCap"
                            value={marketCap}
                            onChange={handleChange}
                            onBlur={e => validateMarketCap(e.target.value)}
                        />

                        <label htmlFor="date-picker">
                            Launch Date
                            <i className="required">*</i>
                        </label>
                        <div>
                            <DatePicker
                                id="date-picker"
                                value={launchDate}
                                onChange={handleDateChange}
                                clearIcon={null}
                                className="date-picker"
                                format="y-MM-dd"
                            />
                        </div>
                        {
                            showLaunchDateError
                                ?
                                    <span className="add-coin-error">
                                        The launch date is required!
                                    </span>
                                : ''
                        }

                        <div className="form-check form-switch">
                            <input
                                id="presale"
                                name="presale"
                                className="form-check-input"
                                type="checkbox"
                                onClick={handleCheckbox}
                                value={isPresale}
                            />
                            <label htmlFor="presale" className="form-check-label">
                                <strong>Presale</strong>
                            </label>
                        </div>

                    </div>

                    <div className="col-5">
                        <h4>Additional Information</h4>

                        <label htmlFor="contractAddress">
                            Contract Address
                        </label>
                        <input
                            id="contractAddress"
                            className="input-field"
                            type="text"
                            name="contractAddress"
                            value={contractAddress}
                            onChange={handleChange}
                            onBlur={e => validateContractAddress(e.target.value)}

                        />

                        <label htmlFor="website">
                            Website
                            <i className="required">*</i>
                        </label>
                        <input
                            id="website"
                            name="website"
                            onChange={handleChange}
                            onBlur={event => validateWebsiteField(event.target.value)}
                            className="input-field"
                            type="text"
                        />
                        {
                            showWebsiteError
                                ?
                                    <span className="add-coin-error">
                                        The website is required!
                                    </span>
                                : ''
                        }

                        <label htmlFor="telegram">
                            Telegram
                        </label>
                        <input
                            id="telegram"
                            className="input-field"
                            type="text"
                            name="telegram"
                            value={telegram}
                            onChange={handleChange}
                            onBlur={e => validateTelegram(e.target.value)}
                        />

                        <label htmlFor="twitter">
                            Twitter
                        </label>
                        <input
                            id="twitter"
                            className="input-field"
                            type="text"
                            name="twitter"
                            value={twitter}
                            onChange={handleChange}
                            onBlur={e => validateTwitter(e.target.value)}
                        />

                        <label htmlFor="logo">
                            Logo URL
                        </label>
                        <input
                            id="logo"
                            className="input-field"
                            type="text"
                            name="logo"
                            value={logo}
                            onChange={handleChange}
                            onBlur={e => validateLogo(e.target.value)}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-5 offset-5 text-right">
                        <input type="submit" className="btn btn-success submit-coin" />
                    </div>
                </div>
            </form>
        </div>
    );
}
