// ⭐⭐⭐ IMPORT FONT-AWSEOME LIBRARARY

// npm install --save @fortawesome/react-fontawesome
// npm install --save @fortawesome/free-solid-svg-icons
import {useState, useRef, useEffect} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

function App(){
    
    const [taskList, setTaskList] = useState(function(){
        const task = localStorage.getItem('task');
        return task === null ? [] : JSON.parse(task);
    });

    function onHandleDelete(task){
        setTaskList((curr) => curr.filter((tsk)=> tsk !== task));
    }

    function onHandleEdit(task){

    }
    
    useEffect(function(){
        document.title=`React To-Do List`;
        localStorage.setItem('task',JSON.stringify(taskList));
    },
    [taskList]);
    return (
        <div className="container">
            <Heading />
            <Form taskList={taskList} setTaskList={setTaskList}/>
            <Task taskList={taskList} onDeleteTask={onHandleDelete} onEditTask={onHandleEdit}/>
        </div>
    );
}

function Heading(){
    return (
        <h1 id="heading">Get Things Done!</h1>
    );
}

function Form({setTaskList}){
    const [task, setTask] = useState("");
    const myRef = useRef(null);

    function onHandleAddTask(){
        if(task.length){
            setTaskList((curr) => [...curr, task]);
            setTask("");
        }
    }
    
    return (
        <div className="form-container">
            <input type="text" placeholder="What is the task today?" onChange={(e) => setTask(e.target.value)} value={task} ref={myRef}/>
            <button className="add-btn" onClick={()=>onHandleAddTask()}>Add Task</button>
        </div>
    );
}

function Task({taskList, onDeleteTask, onEditTask}){
    if(taskList.length === 0)
        return <p className="zero-task">No task added</p>
    return (
            <ul className="list-items">
            {
                taskList.map((task,i) => <List task={task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} key={i}/>)
            }
        </ul>
    );
}

function List({task, onDeleteTask, onEditTask}){
    const [isCompleted, setIsCompleted] = useState(false);
    function onHandleComplete(){
        setIsCompleted((isCompleted) => isCompleted = !isCompleted);
    }
    return (
        <li className={isCompleted ? `completed tasks` : "tasks"} onClick={onHandleComplete}>
            <p>{task}</p>
            <div className="icons">
                <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={()=>onEditTask(task)}/>
                <FontAwesomeIcon icon={faTrash} className="trash" onClick={()=>onDeleteTask(task)}/>
            </div>
        </li>
    );
}

export default App;