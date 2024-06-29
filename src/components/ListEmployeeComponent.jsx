import React, {useEffect, useState} from "react";
import {deleteEmployeeApi, listEmployees} from "../services /EmployeeService";
import Header from "./Header";
import {Footer} from "./Footer";
import {Link, useNavigate} from "react-router-dom";
function  ListEmployeeComponent(){

    const [employees,setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(()=>{
       listAllEmployees();
    },[])
    function listAllEmployees(){
        listEmployees()
            .then(response=>{
                console.log("Employees",response)
                setEmployees(response.data)
            })
            .catch(error=>{
                console.log(error)
            })
    }
    function addNewEmployee(){
        navigator("/add-employee")
    }

    function updateEmployee(id) {
        navigator(`/update-employee/${id}`)
    }

    function deleteEmployee(id) {
        deleteEmployeeApi(id)
            .then(response=> {
                console.log(response)
                listAllEmployees()
            })
            .catch(error=> console.log(error))
    }

    return(
       <>
           <div className="container">

               <h2 className="text-center mt-5">List of Employee Table</h2>
                   <button className="btn btn-primary" onClick={addNewEmployee}>Add Employee</button>
               <table className="mt-4  table-striped">
                   <thead>
                   <tr>
                       <th>Employee Id</th>
                       <th>Employee First Name</th>
                       <th>Employee Last Name</th>
                       <th>Employee Email Id</th>
                       <th>Actions</th>
                   </tr>
                   </thead>
                   <tbody>
                   {
                       employees.map(employee=>
                           <tr key={employee.id}>
                               <td>{employee.id}</td>
                               <td>{employee.firstName}</td>
                               <td>{employee.lastName}</td>
                               <td>{employee.email}</td>
                               <td>
                                   <button className="btn btn-info " onClick={()=>updateEmployee(employee.id)}>
                                       Update
                                   </button>
                                   <button className="btn btn-danger" style={{marginLeft:'5px'}} onClick={()=>deleteEmployee(employee.id)}>
                                       Delete
                                   </button>
                               </td>
                           </tr>
                       )
                   }
                   </tbody>
               </table>
           </div>

       </>
    )
}
export default ListEmployeeComponent;