import React, {useEffect, useState} from "react";
import {getEmployeeApi, saveEmployeeApi, updateEmployeeApi} from "../services /EmployeeService";
import {useNavigate, useParams} from "react-router-dom";


const CreateEmployee = () =>{
    const[firstName,setFirstName] = useState("")
    const[lastName,setLastName] = useState("")
    const[email,setEmail] = useState("")
    const[errors,setErrors] = useState({firstname:'',lastName:'',email:''})
    const navigator = useNavigate();
    const {id}= useParams();
console.log("id is",id)
    function handleFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleLastName(e) {
setLastName(e.target.value)
    }

    function handleEmail(e) {
setEmail(e.target.value)
    }

    function saveOrUpdateEmployee(e) {
    e.preventDefault()
        if(validate()){
            const employee = {firstName,lastName,email}
            if(id){
                updateEmployeeApi(id, employee)
                    .then(r =>{console.log(r)})
                    .catch(r =>{console.log(r)})
                navigator("/employees")
            }else {
                saveEmployeeApi(employee)
                    .then(response=> console.log(response))
                    .catch(error=>console.log(error))
                navigator("/employees")
            }

        }


    }
    function validate(){
        let valid = true;

        const errorCopy = {...errors}
        if(firstName.trim())
        {
        errorCopy.firstname = '';
        }
        else{
            errorCopy.firstname = 'First name is required'
            valid = false;
            }
        if(email.trim())
        {
            errorCopy.email = '';
        }
        else{
            errorCopy.email = 'Email is required'
            valid = false;
        }
        if(lastName.trim())
        {
            errorCopy.lastName = '';
        }
        else{
            errorCopy.lastName= 'Last name is required'
            valid = false;
        }
       setErrors(errorCopy)
        return valid;
    }
    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Employee</h2>
        }
        else return <h2 className="text-center">Add Employee</h2>
        }
    useEffect(()=>{
        getEmployeeApi(id)
            .then(r => {
                setFirstName(r.data.firstName)
                setLastName(r.data.lastName)
                setEmail(r.data.email)
            })
            .catch(er=> console.log(er))
    },[])
    function updateEmployee(){
        const updatedEmployee ={firstName,lastName,email}
        console.log("updated",updatedEmployee)
        updateEmployeeApi(id, updatedEmployee)
            .then(r =>{console.log(r)})
            .catch(r =>{console.log(r)})
    }
    return (
        <div className="container">
           <div className="row">
               <div className="card col-md-6 mt-5 mx-auto">
                   {pageTitle()}
                   <div className="card-body">
                       <form action="">
                           <div className="form-group mb-2">
                               <label className="form-label">First Name</label>
                               <input type="text" className={`form-control ${errors.firstname ? 'is-invalid': ''}`}
                                      placeholder="Enter Employee First Name"
                                      name="firstname"
                                        value={firstName}
                                      onChange={handleFirstName}
                               />
                               {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">Last Name</label>
                               <input type="text" className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                                      placeholder="Enter Employee Last Name"
                                      name="lastname"
                                      value={lastName}
                                      onChange={handleLastName}
                               />
                               {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                           </div>
                           <div className="form-group mb-2">
                               <label className="form-label">Employee Email</label>
                               <input type="text" className={`form-control ${errors.email? 'is-invalid': ''}`}
                                      placeholder="Enter Employee Email"
                                      name="email"
                                      value={email}
                                      onChange={handleEmail}
                               />
                               {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                           </div>
                          <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>

                       </form>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default CreateEmployee;