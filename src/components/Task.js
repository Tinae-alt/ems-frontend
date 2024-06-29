

import Styles from './styles.module.css';
import { Link} from "react-router-dom";


function Task(props){

    const { id,fetchTasks, deleteTask} = props;

    const handleDelete = async (id) => {
    
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
      return(
        
        <div>
            <Link to={`/update/${id}`} className={Styles.btn_warning + ' btn-block'}>Edit</Link> 
            <Link className={Styles.btn_danger + ' btn-block'} onClick={() => handleDelete(id)}>Delete</Link>
            <Link to={`/view/${id}`} className="btn btn-success">View</Link> 
            
        </div>
    );
    
}

    

export default Task