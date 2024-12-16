import React from "react";
import ReactDOM from "react-dom/client";
import {useState} from "react";
// import App from './App';
// import './index.css';

import StarRating from './StarRating';

function Test(){
    const [movieRating, setMovieRating] = useState(0);
    return(
        <div>
            <StarRating color='blue' maxRating={10} onSetRating = {setMovieRating}/>
            <p>This movie was rated {movieRating} stars</p>
        </div>
    )
}

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);

root.render(
    <React.StrictMode>
        <StarRating maxRating={5} message={['Terrible','Bad','Okay','Good','Amazing']} />
        <StarRating size={24} color="red" defaultRating={3}/>
        <Test />
        {/* <StarRating maxRating={10} />
        <StarRating /> */}
    </React.StrictMode>
)