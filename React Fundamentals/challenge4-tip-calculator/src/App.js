import {useState} from "react";

function App(){
    const [amount, setAmount] = useState("");
    const [myTip, setMyTip] = useState(0);
    const [friendTip, setFriendTip] = useState(0);

    function handleAmount(e){
        if(!Number(e.target.value))
        {
            setAmount(""); return;
        }
        setAmount(Number(e.target.value));
    }

    // function handleMyTip(e){
    //     setMyTip(Number(e.target.value));
    // }

    // function handleFriendTip(e){
    //     setFriendTip(Number(e.target.value));
    // }

    function ResetAmount(){
        setAmount("");
        setMyTip(0);
        setFriendTip(0);
    }
    
    return (
        <div>
            <Bill onHandleAmount = {handleAmount} amount = {amount}/>
            {/* <MineTip onHandleMyTip = {handleMyTip} tip = {myTip}/>
            <FriendTip onHandleFriendTip = {handleFriendTip} tip = {friendTip}/> */}
            <Tip onHandleTip = {setMyTip} tip = {myTip} >How did you like the service?</Tip>
            <Tip onHandleTip = {setFriendTip} tip = {friendTip} >How did your friend like the service?</Tip>
            <Total amount = {amount} myTip = {myTip} friendTip = {friendTip}/>
            <Reset onResetAmount = {ResetAmount} amount = {amount}/>
        </div>
    )
}

function Bill({onHandleAmount, amount}){
    return (
        <div>
            <label>How much was the bill?</label>
            <input type="text" placeholder="Bill value" onChange = {(e) => onHandleAmount(e)} value={amount}/>
        </div>
    )
}

function Tip({onHandleTip, tip, children}){
    return (
        <div>
            <label>{children}</label>
            <select onChange = {(e) => onHandleTip(Number(e.target.value))} value={tip}>
                <option value={0}>Dissatisfied (0%)</option>
                <option value={5}>It was Okay (5%)</option>
                <option value={10}>It was good (10%)</option>
                <option value={20}>Absolutely amazing! (20%)</option>
            </select>
        </div>
    )
}

// function MineTip({onHandleMyTip, tip}){

//     return (
//         <div>
//             <label>How did you like the service?</label>
//             <select onChange = { (e) => {onHandleMyTip(e)}} value={tip}>
//                 <option value={0}>Dissatisfied (0%)</option>
//                 <option value={5}>It was Okay (5%)</option>
//                 <option value={10}>It was good (10%)</option>
//                 <option value={20}>Absolutely amazing! (20%)</option>
//             </select>
//         </div>
//     )
// }

// function FriendTip({onHandleFriendTip, tip}){

//     return (
//         <div>
//             <label>How did your friend like the service?</label>
//             <select onChange = { (e) => onHandleFriendTip(e) } value={tip}>
//                 <option value={0}>Dissatisfied (0%)</option>
//                 <option value={5}>It was Okay (5%)</option>
//                 <option value={10}>It was good (10%)</option>
//                 <option value={20}>Absolutely amazing! (20%)</option>
//             </select>
//         </div>
//     )
// }

function Total({amount, myTip, friendTip}){
    return (
        <h1>
            {amount !== "" ? `You pay $${amount+Math.round(myTip+friendTip)/2} ($${amount} + $${Math.round(myTip+friendTip)/2})` : ""}
        </h1>
    )
    
}

function Reset({onResetAmount, amount}){
    {
       return amount !== "" ? <button onClick = {onResetAmount}>Reset</button> : "";
    }
}

export default App;