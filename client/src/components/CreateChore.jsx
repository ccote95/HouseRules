import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from "reactstrap";
import { createAChore } from "../managers/choreManager.js";

export default function CreateChore()
{
    const [newChore, setNewChore] = useState({})
    const [newChoreName, setNewChoreName] = useState()
    const [newChoreDifficulty, setNewChoreDifficulty] = useState()
    const [newChoreFrequency, setNewChoreFrequency] = useState()
    const [errors,setErrors] = useState("")
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000); // Hide the toast after 5 seconds

            // Cleanup timeout if component unmounts or showToast changes
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleSubmit = (e) => {
        e.preventDefault();
      const chore = {
        name: newChoreName,
        difficulty: newChoreDifficulty,
        choreFrequencyDays: newChoreFrequency
      };
      createAChore(chore).then((res) => {
        if (res.errors) {
            setErrors(res.errors.Name);
            setShowToast(true)
          
        } else {
            navigate("/chores");
        }
        });
    }

   
    return(
        <div>
        <Form className="w-50 mx-auto " onSubmit={handleSubmit}>
            <FormGroup>
                <Label>
                    Name
                </Label>
                <Input
                name="Name"
                placeholder="Enter a name for your chore"
                onChange={(e) => {setNewChoreName(e.target.value)}}/>
            </FormGroup>
            <FormGroup>
                <Label>
                    Difficulty Level
                </Label>
            <Input
            type="select"
            onChange={(e) => {setNewChoreDifficulty(parseInt(e.target.value))}}>
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
                onChange={(e) => {setNewChoreFrequency(parseInt(e.target.value))}} />
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
        {showToast && (
                <Toast  isOpen={showToast}  style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
                    <ToastHeader toggle={() => setShowToast(false)}>Errors</ToastHeader>
                    <ToastBody>
                        {errors}
                    </ToastBody>
                </Toast>
            )}
        </div>
        
       
    )
}