import React, { useState } from 'react';
import Styles from './styles.module.css';
import { addTask} from "../services /api";
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
  try{
    const taskData = {
      title: title,
      description: description
    };
    await addTask(taskData);
    setTitle("");
    setDescription("");
    navigate("/");
  }
    catch(error){
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className='d-flex w-100 justify-content-center mt-5 align-items-centre'>
      
      <div className='w-50 border bg-secondary text-white p-5'>
      <h2>Add A Task</h2>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input className={Styles.textbox} name='title'
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          &nbsp;
          <label htmlFor="description">Description:</label>
          <textarea className={Styles.textbox} name='description'
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
           <button className={Styles.btn_primary} type="submit">Save</button>
        </div>

       
        
      </form>
      </div>
    </div>
    
  );
}

export default TaskForm;
