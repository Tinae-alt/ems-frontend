import React, { useState,useEffect } from 'react';
import Styles from './styles.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getTask,updateTask} from "../services /api";

function TaskEditor() {
  const {id} = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

    const navigate = useNavigate();
 
 

  useEffect(() => {
    fetchTask(id);
  }, []);

  const fetchTask = async (id) => {
    try {
      const response = await getTask(id);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

 
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const taskData = {
        title: title,
        description: description
      };
      await updateTask(id,taskData);
      setTitle("");
      setDescription("");
      navigate("/");
    }
      catch(error){
        console.error('Error creating task:', error);
      }
  
  };

  return (
    
    <div className='d-flex w-100 justify-content-center mt-60 align-items-centre mt-5'>
      
      <div className='w-50 border bg-secondary text-white p-5'>
      <h2>View Task</h2>
    <p>
        {title}
    </p>
    <p>
        {description}
    </p>
    
    <Link  to='/' className="btn btn-success my-3">Go Back</Link>
      </div>

    </div>
  );
}

export default TaskEditor;