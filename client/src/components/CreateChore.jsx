import { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function CreateChore()
{
    const [newChore, setNewChore] = useState({})
    const [newChoreName, setNewChoreName] = useState()
    const [newChoreDifficulty, setNewChoreDifficulty] = useState()
    const [newChoreFrequency, setNewChoreFrequency] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewChore({
            name: newChoreName,
            difficulty: newChoreDifficulty,
            choreFrequency: newChoreFrequency
        });
    }
    return(
        <Form className="w-50 mx-auto " onSubmit={handleSubmit}>
            <FormGroup>
                <Label>
                    Name
                </Label>
                <Input
                name="Name"
                placeholder="Enter a name for your chore"
                onChange={(e) => {setNewChore(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label>
                    Difficulty Level
                </Label>
            <Input
            type="select"
            onChange={(e) => {setNewChoreDifficulty(e.target.value)}}>
            <option>
                Choose a Difficulty
            </option>
            <option>
                1
            </option>
            <option>
                2
            </option>
            <option>
                3
            </option>
            <option>
                4
            </option>
            <option>
                5
            </option>

            </Input>
            </FormGroup>
            <FormGroup>
                <Label>
                    Chore Frequency
                </Label>
                <Input
                name="chore frequency"
                type="text"
                placeholder="Enter the chores frequency in Days"
                onChange={(e) => {setNewChoreFrequency(e.target.value)}} />
            </FormGroup>
            <FormGroup>
                <Button type= "submit"
                style={{float: "right"}}
                color="primary"
                >
                    Submit
                </Button>
            </FormGroup>
        </Form>
       
    )
}