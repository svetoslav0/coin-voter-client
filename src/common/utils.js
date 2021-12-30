export const zeroPad = (num, places) => {
    return String(num).padStart(places, '0');
}

export const formatDate = value => {
    const date = zeroPad(value.getDate(), 2);
    const month = zeroPad(value.getMonth() + 1, 2);
    const year = value.getFullYear();

    return `${year}-${month}-${date}`;
};

