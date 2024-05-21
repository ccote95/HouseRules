const _api = "/api/chore"

export const getChores = () => {
    return fetch(_api).then((res) => res.json())
};