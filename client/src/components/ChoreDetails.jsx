import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChoreByIdWithAssignies, handleCheckBoxChange } from "../managers/choreManager.js"
import { Card, CardBody, CardText, CardTitle, Input, Label } from "reactstrap"
import { getUsers } from "../managers/userProfileManager.js"

export default function ChoreDetails()
{
    const {choreid} = useParams()
    const [chore, setChore] = useState({})
    const [users, setUsers] = useState([])

    useEffect(() => {
        getChoreByIdWithAssignies(choreid).then(setChore)
        getUsers().then(setUsers)
    },[])
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle tag={"h5"}>
                        {chore.name}
                    </CardTitle>
                    <CardText>
                    Chore Difficulty: {chore.difficulty}
                    </CardText>
                    <CardText>
                    Chore Frequency: {chore.choreFrequencyDays}
                    </CardText>
                        {chore.choreCompletions?.length > 0 ?( chore.choreCompletions?.map((cc) => (
                            
                    <CardText>

                       Recent Completions: {cc.userProfile.firstName} {cc.userProfile.lastName }
                    </CardText>
                        ))
                    ) : (
                        <CardText>
                            Recent Completions : No Completions yet!
                        </CardText>
                    )}
                    <h4 style={{fontWeight: "bold"}}>Assign a User</h4>
                    {users.map((user) => 
                        {
                         const isChecked = user.choreAssignments.some(ca => ca.choreId == chore.id)
                            return(
                                <CardText>
                                    <Input
                                    type="checkbox"
                                    checked = {isChecked}
                                    onChange={(e) => handleCheckBoxChange(user.id, e.target.checked)}/>
                                    <Label>
                                    {user.firstName} {user.lastName}
        
                                    </Label>
                                </CardText>

                            )

                        
                        }
                    )}
                </CardBody>
            </Card>
        </div>
    )
}