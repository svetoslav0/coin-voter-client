export const login = (username, password) => {
    const details = { username, password };

    const formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    const body = formBody.join("&");

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body
    };

    return fetch('http://localhost:8090/users/login', options)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem('token', JSON.stringify(token));

            return token;
        });
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
