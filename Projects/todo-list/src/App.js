function App(){
    return (
        <div className="container">
            <h1 id="heading">Get Things Done!</h1>
            <Form />
        </div>
    );
}

function Form(){
    return (
        <div className="form-container">
            <input type="text" placeholder="What is the task today?"/>
            <button className="add-btn">Add Task</button>
        </div>
    );
}

export default App;