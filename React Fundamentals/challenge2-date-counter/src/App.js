import { useState } from "react";

function App(){
    return (
        <Counter />
    )
}

function Counter(){
    // const steps = 1;
    const [steps, changeSteps] = useState(0);
    const [count, changeCount] = useState(1);

    // function Decrease(){
    //     changeSteps((s) => s-1);
    // }
    // function Increase(){
    //     changeSteps((s) => s+1);
    // }
    const date = new Date();
    date.setDate(date.getDate()+count);
    return(
        <div style={{width:"max-content", margin: "auto"}}>
            <div>
                <button
                onClick = { ()=> { changeSteps((s) => s-1) } } >-</button>
                <span>Step: {steps}</span>
                <button onClick = { ()=> changeSteps((s) => s+1) }>+</button>
            </div>
            <div>
                <button
                onClick = { () => changeCount((c) => c-steps)}>-</button>
                <span>Count: {count}</span>
                <button
                onClick = {() => changeCount((c) => c+steps)}>+</button>
            </div>
            <p>
                <span> {count == 0 ? "Today is " : (count < 0 ? `${count} days ago was: ` : `${count} days from today is: `)} </span>
                <span>{date.toDateString()}</span>
            </p>
        </div>
    )
}

export default App;