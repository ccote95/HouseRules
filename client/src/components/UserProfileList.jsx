import { useEffect, useState } from "react"
import { getUsers } from "../managers/userProfileManager.js"

export default function UserProfileList()
{
    const [users, setUsers] = useState()
    useEffect(() => {
        getUsers().then(setUsers)
    },[])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {users?.map((user) => {
                return(
                    <div >
                        <div className="card" style={{width: '18rem', margin:'auto', marginTop:'10px'}}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{user.firstName} {user.lastName}</li>
                                <li className="list-group-item">{user.email}</li>
                                <li className="list-group-item">{user.address}</li>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}