import { useEffect, useState } from "react"
import { completeAChore, getMyChores } from "../managers/choreManager.js"
import { Button, Card, CardBody, CardTitle } from "reactstrap"

export default function MyChores({loggedInUser})
{
    const [user, setUser] = useState({})

    useEffect(() => {
        getMyChores(loggedInUser.id).then(setUser)
    },[])
    return(
        <div className="position-relative " >
            <h2>{user.firstName} 's Overdue Chore's</h2>
       {user.choreAssignments?.map((ca) => {
        return(
        <Card className="m-auto my-4 p-1 w-50 card text-bg-danger mb-3" style={{width: "18rem"}}>
            <CardTitle className="p-1">
                Please Complete
            </CardTitle>
            <CardBody>
            {ca.chore.name}
            <Button  className="btn-success" style={{float: "right"}}
             onClick={() => {completeAChore(ca.chore.id,loggedInUser.id).then(() => {getMyChores(loggedInUser.id).then(setUser)})}}>Complete</Button>
            </CardBody>
        </Card>

        )
       })}

     
        </div>
    )
}
// need to hook functionality up to the complete button to send the completion to the database