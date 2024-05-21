import { useEffect, useState } from "react"
import { getChores } from "../managers/choreManager.js"
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap"

export default function ChoreList({loggedInUser})
{
    const[chores, setChores]=useState([])

    useEffect(() => {
        getChores().then(setChores)
    },[])
    return(
        <div className="grid gap-0 row-gap-3" style={{display: 'flex', flexDirection: 'column'}}>
            {chores.map((chore) => {
                return(
                    <Card key={chore.id} className="card border-dark mb-3">
                        <CardBody>
                           <CardTitle tag={"h5"}>
                            {chore.name}
                            </CardTitle>
                                <CardText>
                                Chore Difficulty: {chore.difficulty}
                                </CardText> 
                                <CardText>
                                    Chore Frequency: {chore.choreFrequencyDays}
                                    {loggedInUser.roles.includes("Admin") ? (
                                        <Button className="btn-danger" style={{float: "right",}}>DELETE</Button>

                                    ) : (null)}
                                </CardText>
                               
                            </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}