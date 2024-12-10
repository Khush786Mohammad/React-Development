import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App(){
    
    return(
        <div>
            <Steps />
            <StepMessage steps={1}>Hello How are you👋</StepMessage>
            <StepMessage steps={2}>🖐 Good Buddy</StepMessage>
            <StepMessage steps={3}>
                <span>🙋‍♀️</span>
                <p>Ok Bye</p>
                <span>🙋‍♂️</span>
            </StepMessage>
        </div>
    );
}

function Steps(){
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious(){
        if(step > 1)
        setStep( (s) => s-1 );
    }

    function handleNext(){
        if(step < 3)
        setStep( (s) => s+1 );
    }
    return (
        <>
            <button className="close" onClick = {()=>setIsOpen(iO => !iO)}>&times;</button>
            {
                isOpen && (
                    <div className="steps">
            <div className='numbers'>
                <div className={ step>=1 ? "active" : "" }>1</div>
                <div className={ step>=2 ? "active" : "" }>2</div>
                <div className={ step>=3 ? "active" : "" }>3</div>
            </div>

            <StepMessage steps={step} >
                {messages[step-1]}
             </StepMessage>

            <div className="buttons">
                
                <Button textColor="#fff" bgColor="#7950f2" fn={handlePrevious} ><span>👈</span>Previous</Button>

                <Button textColor="#fff" bgColor="#7950f2" fn={handleNext}>Next<span>👉</span></Button>

            </div>
        </div>
                )
            }
        </>
    );
}

function StepMessage({steps, children}){
    return(
        <div className="message">
            <h3>Step {steps}: </h3>
            {children}
        </div>
    );
}

function Button(props){
    console.log(props);
    console.log(props.children);
    return (
        <button style={{color:props.textColor, backgroundColor:props.bgColor}} onClick = {props.fn} >{props.children}</button>
    );
}

export default App;