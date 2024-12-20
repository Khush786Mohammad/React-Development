//sideEffects --> a piece of code that doesn't depends upon or affect the rendering of UI
// useEffects --> used to handle sideEffects
// takes 2 arguments --> i) function containing sideEffect ii) array of dependencey
import {useState, useEffect} from "react";
export default function App(){
    // const [advice, setAdvice] = useState('promise');
    // useEffect(function(){
    //     fetch('https://api.adviceslip.com/advice')
    //     .then((response) => response.json())
    //     .then((data) => setAdvice(data.slip.advice));
    // },[]);
    // console.log(advice);


    // ⭐ CLEAN-UP FUNCTION

    const [value, setValue] = useState(false);

    return (
        <>
            {/* <div>{advice}</div> */}
            <h1>Decode</h1>
            <button onClick={()=>setValue(!value)}>Toggle</button>
            {value && <Child />}
        </>
    )
}

function Child(){

    useEffect(()=>{
        let i = 0;
        let interval = setInterval( ()=>{console.log('hello-'+ i); i++},1000);

        return function(){
            clearInterval(interval);
            console.log("im leaving");
        }
    },[])
    return <h2>Child</h2>
}
