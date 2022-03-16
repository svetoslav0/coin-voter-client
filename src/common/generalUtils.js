export const zeroPad = (num, places) => {
    return String(num).padStart(places, '0');
}

/**
 * @param {Date} value
 * @returns {string}
 */
export const formatDateForBackend = value => {
    const date = zeroPad(value.getDate(), 2);
    const month = zeroPad(value.getMonth() + 1, 2);
    const year = value.getFullYear();

    return `${year}-${month}-${date}`;
};

export const formatDateForDetails = value => {
    const date = new Date(value);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
};

export const canVote = coin => {
    if (!coin?.user_last_voted) {
        return true;
    }

    // todo: put consts in config or in consts
    const hoursDiff = Math.abs(new Date() - new Date(coin.user_last_voted)) / 36e5;
    return hoursDiff >= 6;
};
