export const buildQueryParams = params => {
    const queryParams = [];
    for (const property in params) {
        queryParams.push(`${property}=${params[property]}`);
    }

    return queryParams.join('&');
}

export const buildBodyParams = params => {
    const formBody = [];
    for (const property in params) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(params[property]);
        formBody.push(`${encodedKey}=${encodedValue}`);
    }

    return formBody.join('&');
};

export const handleResponse = response => {
    return response
        .text()
        .then(text => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                // TODO: handle non-auth responses
                // if ([401, 403].indexOf(response.status) !== -1) {
                //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                //     authenticationService.logout();
                //     location.reload(true);
                // }
                //
                // const error = (data && data.message) || response.statusText;
                return Promise.reject(data);
            }

            return data;
        });
}

export const setItemInLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key) => {
    return localStorage.getItem(key);
}
