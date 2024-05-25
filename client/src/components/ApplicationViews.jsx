import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home.jsx";
import UserProfileList from "./UserProfileList.jsx";
import UserDetails from "./UserProfileDetails.jsx";
import ChoreList from "./ChoreList.jsx";
import ChoreDetails from "./ChoreDetails.jsx";
import CreateChore from "./CreateChore.jsx";
import MyChores from "./MyChores.jsx";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<AuthorizedRoute loggedInUser={loggedInUser}><Home/>
          </AuthorizedRoute>}
   
     
        />
        <Route path="userprofiles" >
          <Route index element={<AuthorizedRoute Roles={"Admin"} loggedInUser={loggedInUser}>
        <UserProfileList/>
        </AuthorizedRoute>}></Route>
          <Route path=":userprofileid" element={
          <AuthorizedRoute Roles={"Admin"} loggedInUser={loggedInUser}>
            <UserDetails/>
          </AuthorizedRoute>
          }/>

        </Route>
        <Route path="chores">
          <Route index element={<AuthorizedRoute loggedInUser={loggedInUser}>
            <ChoreList loggedInUser={loggedInUser}/>
            </AuthorizedRoute>}/>
            <Route path=":choreid" element={<AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoreDetails loggedInUser={loggedInUser}/>
            </AuthorizedRoute>}/>
            <Route path="create" element={<AuthorizedRoute Roles={"Admin"}>
            <CreateChore loggedInUser={loggedInUser}/>
            </AuthorizedRoute>}/>
        </Route>

        <Route path="mychores">
          <Route index element={<AuthorizedRoute loggedInUser={loggedInUser}>
            <MyChores loggedInUser={loggedInUser}/>
            </AuthorizedRoute>
           }/>

        </Route>


       

        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
