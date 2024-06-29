import {Footer} from "./Footer";
import Header from "./Header";
import {useState} from "react";
import {registerAPICall} from "../services /AuthService";

function Register(){
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function handleRegistration(e) {
        e.preventDefault()
        const register = {name,username,email,password}
        console.log("register",register)
        registerAPICall(register)
            .then(r => console.log("response",r))
            .catch(error=>console.log("error",error))
        console.log("Register",register)
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
                                    <label htmlFor="" className="col-md-3 control-label">Name</label>
                                    <div className="col-md-9">
                                        <input type="text"
                                        name='name'
                                               className="form-control"
                                               placeholder="Enter name"
                                               value={name}
                                               onChange={(e)=> (setName(e.target.value))}
                                        />
                                    </div>
                                </div>
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
                                    <label htmlFor="" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9">
                                        <input type="text"
                                               name='email'
                                               className="form-control"
                                               placeholder="Enter email"
                                               value={email}
                                               onChange={(e)=> (setEmail(e.target.value))}
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
                                    <button className="btn-primary btn" onClick={(e)=>handleRegistration(e)}>
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
export default Register;