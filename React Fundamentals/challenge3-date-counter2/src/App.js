import {useState} from "react";
import './index.css'

function App(){
  const date = new Date();
  const [slider, setSlider] = useState(1);
  const [counter, setCounter] = useState(0);

  console.log(date.toDateString());
  date.setDate(date.getDate() + counter);
  return (
    <div className="container">
      <div>
        <span><input type="range" min= '1' max = '10' value={slider}
          onChange = {(e)=>{setSlider((s) => parseInt(s=e.target.value))}}
        /></span>
        <span>{slider}</span>
      </div>
        <div>

          <button onClick = { () => {setCounter((c) => c-parseInt(slider)) }} > - </button>

          <input type="text" value={counter} onChange = {(e)=> setCounter((s)=> s = parseInt(e.target.value))} />

          <button onClick={() => {setCounter((c) => c+parseInt(slider))}}> + </button>

        </div>
      <p>
        <span>
          {
             counter === 0 ? "Today is: " : ((counter > 0) ? `${counter} days from today is ` : `${counter} days ago was `)
          } 
        </span>
        <span>
          {date.toDateString()}
        </span>
      </p>
       {(slider !== 1 || counter !== 0) ?
        <button onClick = { () => { setCounter((c) => c=0); setSlider((s) => s=1)} }>Reset</button>
        : null
       }
    </div>
  )
}

export default App;