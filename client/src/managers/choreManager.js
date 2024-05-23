const _api = "/api/chore"

export const getChores = () => {
    return fetch(_api).then((res) => res.json())
};

export const deleteChore = (id) => {
   return fetch(`${_api}?id=${id}`,{
        method: "DELETE"
     
    })

}

export const getChoreByIdWithAssignies = (id) => {
    return fetch(`${_api}/${id}/withassigned`).then((res) => res.json())
}

export const createAChore = (chore) => {
return fetch(_api, {
    method: "POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(chore)
}).then((res) => res.json())
}

export const completeAChore = (id,userId) => {
    return fetch(`${_api}/${id}/complete?UserId=${userId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
       
    })
    
}

export const handleCheckBoxChange = (userId, isChecked) => {
    const url = isChecked ?
    `${_api}/${choreId}/assign?userId=${userId}` :
    `${_api}/${choreId}/unassign?userId=${userId}`;
    const method = isChecked ? "POST": "DELETE";
    return fetch(url, {
        method: method,
        headers:
        {
            "Content-Type": "application/json"
        }
    })
}