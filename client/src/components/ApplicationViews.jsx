import { Route, Routes } from "react-router-dom";
import Bikes from "./bikes/Bikes";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import WorkOrderList from "./workorders/WorkOrderList.jsx";
import CreateWorkOrder from "./workorders/CreateWorkOrder.jsx";
import UserProfileList from "./userprofiles/UserProfilesList.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
     
        />
      
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
