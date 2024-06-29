import {Footer} from "./Footer";
import Header from "./Header";
import {useState} from "react";
import {getToken, loginAPICall, saveLoggedInUser, storeToken} from "../services /AuthService";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginComponent(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
  async  function handleLogin(e) {
        e.preventDefault()

        const login = {usernameOrEmail:username,password}
       await loginAPICall(login.usernameOrEmail,password)
            .then(r => {
                console.log("token destructured",r.data.accessToken)
                // const token = 'Basic ' + window.btoa(username + ":" + password)
                const token = 'Bearer ' + r.data.accessToken;
                storeToken(token);
                saveLoggedInUser(username);
                navigate("/employees")
                // window.location.reload(false);
            })
            .catch(error=>console.log("error",error))
        console.log("Register",login)
    }



    return (
        <div className="container">
            <br/><br/>
            <div className="row">
                <div className="col-md-6 offset-md-6 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="text-center">
                                User Registration Form
                            </h2>
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className="row mb-3">
                                    <label htmlFor="" className="col-md-3 control-label">Username</label>
                                    <div className="col-md-9">
                                        <input type="text"
                                               name='username'
                                               className="form-control"
                                               placeholder="Enter username"
                                               value={username}
                                               onChange={(e)=> (setUsername(e.target.value))}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input type="text"
                                               name='password'
                                               className="form-control"
                                               placeholder="Enter password"
                                               value={password}
                                               onChange={(e)=> (setPassword(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <button className="btn-primary btn" onClick={(e)=>handleLogin(e)}>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginComponent;