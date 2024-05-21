const _apiUrl = "/api/userprofile";


export const getUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const getUserById = (id) => {
    return fetch(`_apiUrl/{id}`).then((res) => res.json());
}