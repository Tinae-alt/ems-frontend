import React from "react";
import {NavLink} from "react-router-dom";
import {isUserLoggedIn, logout} from "../services /AuthService";
import {useNavigate} from "react-router-dom";

function Header(){
    const navigate = useNavigate();
    const isAuth = isUserLoggedIn();

    function handleLogout() {
        logout();
        navigate('/login')
    }

    return(
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div>
            <a className="navbar-brand" href="http://localhost:3000">Employee Management System</a>
        </div>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                { isAuth &&  <li className="nav-item">
                    <NavLink to="/employees" className="nav-link">Employees</NavLink>
                </li>}
            </ul>
        </div>
        <ul className="navbar-nav">
            {!isAuth &&  <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
            </li>}
            {
                !isAuth &&  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">Register</NavLink>
                </li>
            }
            {
                isAuth &&  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                </li>
            }
        </ul>
    </nav>
)
}
export default Header;