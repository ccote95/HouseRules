import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        🧹🧼House Rules
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
        
            <Nav navbar>
        {loggedInUser.roles.includes("Admin") ? (
                        <NavItem>
                        <NavLink tag={RRNavLink} to="/userprofiles">
                            User Profiles
                        </NavLink>
                       </NavItem>
                ) : (null)}
        </Nav>
        <Nav navbar>
             <NavItem>
                    <NavLink tag={RRNavLink} to="/chores">
                           Chore List
                    </NavLink>
             </NavItem>
        </Nav>
        <Nav navbar>
          {loggedInUser.roles.includes("Admin") ? (
              <NavItem>
              <NavLink tag={RRNavLink} to="/chores/create">
                  Create a Chore
              </NavLink>
          </NavItem>
          ) : (null)}
        </Nav>
        <Nav navbar>
            <NavItem>
                <NavLink tag={RRNavLink} to="/mychores">
                    My Chores
                </NavLink>
            </NavItem>
        </Nav>
            </Collapse>
            <Button
            color="primary"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}