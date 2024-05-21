import { useEffect, useState } from "react"
import { getUserById } from "../managers/userProfileManager.js"
import { useParams } from "react-router-dom"
import { Label } from "reactstrap"

export default function UserDetails()
{
    const [user,setUser]=useState({})
    const {userprofileid} = useParams()

    useEffect(()=> {
        getUserById(parseInt(userprofileid)).then(setUser)
    },[userprofileid])
    return(
        <div className="card" style={{width: '18rem', margin: 'auto', marginTop: '10px'}}>
        <div className="card-header" style={{fontWeight: 'bold'}}>
          {user.firstName} {user.lastName} Details
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{user.email}</li>
          <li className="list-group-item">{user.address}</li>
          <li className="list-group-item">{user.userName}</li>
          <label style={{fontWeight: 'bold', marginLeft: '5px'}}>Chores: </label>
          {user.choreAssignments?.map((chore) => {
            return(
                <li key={chore.id}className="list-group-item">{chore?.chore?.name}</li>

            )
          })}
          <label style={{fontWeight:'bold', marginLeft: '5px'}}>Chores Completed:</label>
               {user.choreCompletions?.map((choreCompletion) => {
                return (
                    <li key={choreCompletion.id} className="list-group-item">{choreCompletion?.chore?.name} {choreCompletion?.completedOnDate}</li>
                )
            })}
        </ul>
      </div>
    )
}