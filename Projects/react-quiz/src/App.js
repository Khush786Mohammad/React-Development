import {useEffect, useReducer} from "react";

import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from "./StartScreen.js";

// best practise to create reducer function out of component;
function reducer(state,action){
  // console.log(state, action);
  switch(action.type){
    case 'dataRecieved':
      return {...state, questions: action.payload, status: "ready"};

    case 'dataFailed':
      return {...state, status: "error"};
    default:
      throw new Error("Action Unknown");
  }
}

const initialState = {
  questions: [],

  // 'loading', 'error, 'ready', 'active', 'finished'
  status: 'loading'
}

export default function App(){
  
  const [state, dispatch] = useReducer(reducer,initialState);
  const {questions, status} = state;
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((response) => response.json())
    .then((data)=> dispatch({type: 'dataRecieved', payload: data}))
    .catch((error)=> dispatch({type: 'dataFailed'}));
  },[])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen length={questions.length}/>}

      </Main>
    </div>
  );
}