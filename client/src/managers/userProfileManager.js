const _apiUrl = "/api/userprofile";


export const getUsers = () => {
    return fetch(_apiUrl).then((res) => res.json());
}