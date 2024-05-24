import { useEffect, useState } from "react"
import { getMyChores } from "../managers/choreManager.js"

export default function MyChores({loggedInUser})
{
    const [user, setUser] = useState({})

    useEffect(() => {
        getMyChores(loggedInUser.id).then(setUser)
    },[])
    return(
        <div>
            hello
        </div>
    )
}