const _api = "/api/chore"

export const getChores = () => {
    return fetch(_api).then((res) => res.json())
};

export const deleteChore = (id) => {
   return fetch(`${_api}?id=${id}`,{
        method: "DELETE"
     
    })

}