import {useState} from "react";

const optionList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

export default function App(){
    const [items, setItems] = useState([]);

    function handleAddItems(item){
        setItems( (items) => [...items , item] );
    }

    function handleDeleteItem(id){
        setItems( (items) => items.filter(item=>item.id !== id) )
    }

    function handleToggleItem(id){
        setItems( (items) => items.map( item => item.id === id ? {...item , packed: !item.packed} : item) )
    }
    return (
        <div className="app">
            <Logo />
            <Form onAddItems = {handleAddItems}/>
            <PackingList items={items} onDeleteItem = {handleDeleteItem} onToggleItem={handleToggleItem}/>
            <Stats />
        </div>
    )
}

function Logo(){
    return (
        <h1>🌴Far Away 💼</h1>
    )
}

function Form({onAddItems}){
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e){
        e.preventDefault();
        if(!description)
            return;

        const newItem = {id: Date.now(), description, quantity, packed: false}
        console.log(newItem);

        onAddItems(newItem);

        setDescription((val) => "");
        setQuantity((val) => 1);
    }

    return (
        <form className="add-form" onSubmit = { (e)=> handleSubmit(e) }>
            <h3>What do you need for your 😍 trip?</h3>
            <select
              value={quantity}
              onChange = { (e) => setQuantity(parseInt(e.target.value)) }
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

function PackingList({items, onDeleteItem, onToggleItem}){
    return (
        <div className="list">
            <ul>
                {
                    items.map((item) => 
                    <Item value={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id}/>)
                }
            </ul>
        </div>
    )
}

function Item({value, onDeleteItem, onToggleItem}){
    return (
        <li> 
            <input type="checkbox" value={value.packed}
                onChange = {() => {onToggleItem(value.id)}}
            />
            <span style={ value.packed ? {textDecoration:"line-through"} : {} }>{value.quantity} {value.description}</span>
            <button onClick={()=>onDeleteItem(value.id)}>❌</button>
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