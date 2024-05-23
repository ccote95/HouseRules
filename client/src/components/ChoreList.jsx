import { useEffect, useState } from "react"
import { completeAChore, deleteChore, getChores } from "../managers/choreManager.js"
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

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
                                        <Button className="btn-danger" style={{float: "right",}} onClick={() => {deleteChore(chore.id).then(() => {
                                            getChores().then(setChores)
                                        })}}>DELETE</Button>

                                    ) : (null)}
                                    <Button style={{float: "right",}} onClick={() => {completeAChore(chore.id,loggedInUser.id)}}>Complete</Button>
                                {loggedInUser.roles.includes("Admin") ? (

                                <div className="d-flex justify-content-center mt-3">
                                      <Link   to={`/chores/${chore.id}`}>
                                    Chore Details
                                    </Link>

                                    </div>
                                ) : (null)}
                                </CardText>
                               
                            </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}