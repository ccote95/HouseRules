import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChoreByIdWithAssignies } from "../managers/choreManager.js"
import { Card, CardBody, CardText, CardTitle } from "reactstrap"

export default function ChoreDetails()
{
    const {choreid} = useParams()
    const [chore, setChore] = useState({})

    useEffect(() => {
        getChoreByIdWithAssignies(choreid).then(setChore)
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

                            

                        
                     {chore.choreAssignments?.length > 0 ? (
    chore.choreAssignments.map((c) => (
        <CardText>
            Current Assignees: {c.userProfile.firstName}
        </CardText>
    ))
) : (
    <CardText>
        Current Assignees: No one's cureently assigned
    </CardText>
)}
                </CardBody>
            </Card>
        </div>
    )
}