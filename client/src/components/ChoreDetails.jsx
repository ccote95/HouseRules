import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChoreByIdWithAssignies, handleCheckBoxChange, updateAChore } from "../managers/choreManager.js"
import { Button, Card, CardBody, CardText, CardTitle, Input, Label } from "reactstrap"
import { getUsers } from "../managers/userProfileManager.js"

export default function ChoreDetails()
{
    const {choreid} = useParams()
    const [chore, setChore] = useState({})
    const [users, setUsers] = useState([])
    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState("")
    const [newDifficulty, setNewDifficulty] = useState()
    const [newFrequency, setNewFrequency] = useState()

    useEffect(() => {
        getChoreByIdWithAssignies(choreid).then(setChore)
        getUsers().then(setUsers)
    },[])

    const handleEditToggle = () => {
        if(!edit)
        {
            setEdit(true)
            setNewName(chore.name);
            setNewDifficulty(chore.difficulty)
            setNewFrequency(chore.choreFrequencyDays)
        }
        else {
            setChore({...chore, name: newName, difficulty: newDifficulty, choreFrequencyDays: newFrequency})
            const updatedChore =
            {
                name: newName,
                difficulty: parseInt(newDifficulty),
                choreFrequencyDays: parseInt(newFrequency)
            }
            updateAChore(updatedChore,chore.id)
            setEdit(false)
        }
    }
    return (
        <div>
            <Card>
                <CardBody>
                    {edit ? (
                        <CardTitle>
                            <Input
                            value={newName}
                            onChange={(e) => {setNewName(e.target.value)}}/>
                        </CardTitle>
                    ): (
                    <CardTitle tag={"h5"}>
                        {chore.name}
                    </CardTitle>

                    )}
                    {edit ? (
                    <CardText>
                        Chore Difficulty: 
                        <Input
                        onChange={(e) => {setNewDifficulty(e.target.value)}}
                        value={newDifficulty}/>
                    </CardText>

                    ) : (
                        <CardText>
                            Chore Difficulty: {chore.difficulty}
                        </CardText>
                    )}
                    {edit ? (
                    <CardText>
                        Chore Frequency:
                        <Input
                        value={newFrequency}
                        onChange={(e) => {setNewFrequency(e.target.value)}}/>
                    </CardText>

                    ) : (
                        <CardText>
                             Chore Frequency: {chore.choreFrequencyDays}
                        </CardText>
                    )}
                  
                        {chore.choreCompletions?.length > 0 ?( chore.choreCompletions?.map((cc) => (
                            
                    <CardText key={cc.id}>

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
                                <CardText key={user.id}>
                                    <Input
                                    type="checkbox"
                                    checked = {isChecked}
                                    onChange={(e) => handleCheckBoxChange(chore.id,user.id, e.target.checked).then( () => {getUsers().then(setUsers)})}/>
                                    <Label>
                                    {user.firstName} {user.lastName}
        
                                    </Label>
                                    
                                </CardText>

                            )

                        
                        }
                    )}
                    <div>
                    <Button color="primary" style={{float: "right"}} onClick={() => handleEditToggle()}>
                        {edit ? 'Save' : 'Edit'}
                    </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}