import { useEffect, useState } from "react"
import { getMyChores } from "../managers/choreManager.js"
import { Card, CardTitle } from "reactstrap"

export default function MyChores({loggedInUser})
{
    const [user, setUser] = useState({})

    useEffect(() => {
        getMyChores(loggedInUser.id).then(setUser)
    },[])
    return(
        <div>
       {user.choreAssignments?.map((ca) => {
        return(
        <Card>
            <CardTitle>
                {ca.chore.name}
            </CardTitle>
        </Card>

        )
       })}

     
        </div>
    )
}