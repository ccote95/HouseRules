import { useEffect, useState } from "react"
import { getChores } from "../managers/choreManager.js"
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap"

export default function ChoreList()
{
    const[chores, setChores]=useState([])

    useEffect(() => {
        getChores().then(setChores)
    },[])
    return(
        <div className="grid gap-0 row-gap-3" style={{display: 'flex', flexDirection: 'column'}}>
            {chores.map((chore) => {
                return(
                    <Card className="p-1">
                        <CardBody>
                           <CardTitle tag={"h5"}>
                            {chore.name}
                            </CardTitle>
                                <CardText>
                                Chore Difficulty: {chore.difficulty}
                                </CardText> 
                                <CardText>
                                    Chore Frequency: {chore.choreFrequencyDays}
                                    
                                    <Button style={{float: "right"}}>DELETE</Button>
                                </CardText>
                               
                            </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}