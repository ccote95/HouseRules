const _apiUrl = "/api/userprofile";


export const getUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getUserById = (Id) => {
    return fetch(`${_apiUrl}/${Id}`).then((res) => res.json());
}