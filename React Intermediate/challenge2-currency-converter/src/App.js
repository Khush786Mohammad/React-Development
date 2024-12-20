// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useState, useEffect} from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");

  function handleAmount(e){
    setAmount(Number(e.target.value));
    console.log(amount);
  }

  function handleInitialCurrency(e){
    setFirstCurrency(e.target.value);
  }

  function handleFinalCurrency(e){
    setSecondCurrency(e.target.value);
  }

  useEffect(function(){
    async function fetchAmount(){
       try{
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${firstCurrency}&to=${secondCurrency}`);
        if(response.ok){
           const data = await response.json();
           setConvertedAmount(Number(data?.rates[secondCurrency]));
           console.log(data);
           console.log(data.rates.EUR);
        }
        else{
         throw new Error("Bad Currency Pair");
        }
       }
       catch(err){
        setConvertedAmount("");
        setAmount("");
        setFirstCurrency("USD");
        setSecondCurrency("INR");
        window.alert(err.message);
       }
    }
    if(amount) fetchAmount();
  },[amount,firstCurrency,secondCurrency]);

  return (
    <div>
      <input type="text" onChange={(e)=>handleAmount(e)} value = {amount}/>
      <select onChange={(e)=>handleInitialCurrency(e)} value={firstCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e)=>handleFinalCurrency(e)} value={secondCurrency}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount? (convertedAmount+" "+secondCurrency):'OUTPUT'}</p>
    </div>
  );
}