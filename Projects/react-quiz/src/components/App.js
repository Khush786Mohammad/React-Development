import {useEffect, useReducer} from "react";

import Header from './Header.js';
import Main from './Main.js';
import Loader from './Loader.js';
import Error from './Error.js';
import StartScreen from "./StartScreen.js";
import Question from  './Question.js';
import NextButton from  './NextButton.js';
import Progress from "./Progress.js";
import Finished from "./Finished.js";
import Footer from './Footer.js';
import Timer from "./Timer.js";

// best practise to create reducer function out of component;
const SECS_PER_QUESTION = 1;
function reducer(state,action){
  // console.log(state, action);
  switch(action.type){
    case 'dataRecieved':
      return {...state, questions: action.payload, status: "ready"};

    case 'dataFailed':
      return {...state, status: "error"};

    case 'start':
      return {...state, status: "active", secondsRemaining: state.questions.length*SECS_PER_QUESTION};

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points};

    case 'nextQuestion':
      return {...state, index: state.index+1, answer: null};

    case 'finished':
      return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore}
      
    case 'tick':
        return {...state, secondsRemaining: state.secondsRemaining-1, status: state.secondsRemaining === 0 ? 'finished' : state.status, highscore: state.points > state.highscore ? state.points : state.highscore};
    
    case 'reset':
      return{...state, status: 'active', index: 0, answer: null, points: 0, secondsRemaining: 10};


    default:
      throw new Error("Action Unknown");
  }
}

const initialState = {
  // these are states
  questions: [],

  // 'loading', 'error, 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

export default function App(){
  
  const [state, dispatch] = useReducer(reducer,initialState);
  const {questions, status, index, answer, points, highscore, secondsRemaining} = state;

  const maxPoints = questions.reduce((accumulator, currentValue) => accumulator+currentValue.points,0);
  const numQuestion = questions.length;

  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then((response) => response.json())
    .then((data)=> dispatch({type: 'dataRecieved', payload: data}))
    .catch(()=> dispatch({type: 'dataFailed'}));
  },[])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen length={questions.length} dispatch={dispatch} />}
        {status === 'active' && 
          <>
          <Progress index={index} numQuestion={numQuestion} points={points} maxPoints={maxPoints} answer={answer} />
          <Question question = {questions[index]} dispatch={dispatch} answer={answer}/>
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestion}/>
          </Footer>
          </>
        }
        {status === 'finished' && <Finished points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}