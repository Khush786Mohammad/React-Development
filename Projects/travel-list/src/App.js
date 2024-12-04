import {useState} from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
  ];

const optionList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export default function App(){
    return (
        <div className="app">
            <Logo />
            <Form />
            <PackingList />
            <Stats />
        </div>
    )
}

function Logo(){
    return (
        <h1>🌴Far Away 💼</h1>
    )
}

function Form(){
    

    const [description, setDescription] = useState("");
    const [optionValue, setOptionValue] = useState(1);

    function handleSubmit(e){
        e.preventDefault();
        if(!description)
            return;
        // initialItems.push({id:4,description: description, quantity: optionValue, packed:false})
        const newItem = {id: Date.now(), description, optionValue, packed: false}
        console.log(newItem);

        setDescription((val) => "");
        setOptionValue((val) => 1);
    }

    return (
        <form className="add-form" onSubmit = { (e)=> handleSubmit(e) }>
            <h3>What do you need for your 😍 trip?</h3>
            <select
              value={optionValue}
              onChange = { (e) => setOptionValue(parseInt(e.target.value)) }
            >
               { optionList.map( (num)=> (<option value={num} key={num} > {num} </option> ))}
            </select>
            <input
              type="text"
              placeholder="Item..."
              value={description}
              onChange={ (e) => setDescription(e.target.value) } 

            />
            <button type="submit">Add</button>
        </form>
    )
}

function PackingList(){
    return (
        <div className="list">
            <ul>
                {
                    initialItems.map((item) => 
                    <Item value={item} key={item.id}/>)
                }
            </ul>
        </div>
    )
}

function Item({value}){
    return (
        <li> 
            <span style={ value.packed ? {textDecoration:"line-through"} : {} }>{value.quantity} {value.description}</span>
            <button>❌</button>
        </li>
    )
}

function Stats(){
    return (
        <footer className="stats">
            <em>
            💼 You have X items on your list, and you already packed X (X%)
            </em>
        </footer>
    )
}