import { useEffect, useState } from "react"
import { getUsers } from "../managers/userProfileManager.js"
import { Button } from "reactstrap"
import { useNavigate } from "react-router-dom"

export default function UserProfileList()
{
    const [users, setUsers] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then(setUsers)
    },[])

    const handleDetailsClick = (userId) => {
        navigate(`${userId}`)
    }
    return (
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {users?.map((user) => {
                return(
                    <div key={user.id}>
                        <div className="card" style={{width: '18rem', margin:'auto', marginTop:'10px'}}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{user.firstName} {user.lastName}</li>
                                <li className="list-group-item">{user.email}</li>
                                <li className="list-group-item">{user.address}</li>
                                <li className="list-group-item"><Button onClick={() => handleDetailsClick(user.id)} style={{float:'right'}}>Details</Button></li>
                            </ul>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}