
import React,{useId, useState,useEffect} from "react";
import Task from './Task';
import Styles from './styles.module.css';
import { getAllTasks,updateTask, deleteTask } from "../services /api";
import { Link } from "react-router-dom";
function TaskList(task) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    return (
      <div className="container mt-5">
        
        <h1>Task Manager Application</h1>
        <Link  to='/create' className="btn btn-success my-3">Create Task</Link>
        <div className={Styles.container}>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Task id={task.id} title={task.title} description={task.description} fetchTasks={fetchTasks} updateTask={updateTask} deleteTask={deleteTask}/>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
  }

export default TaskList