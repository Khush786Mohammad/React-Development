import './style.css';
import {useState} from "react";
const tasks = [
    "Create Array of Grocery Items with their Prices",
    "Show grocery item in dropdown and add textbox & button to Add Them",
    "on Add- Create Object of Grocery Item with Quantity and add it to New Array CartItems",
    "if item already added Increment quantity",
    "Use For Loop on CartItems to Display Cart Items in Table"
]

const items = [
    {
        id: 1,
        name: "Cooking Oil",
        price: 120,
        quantity: 0,
    },
    {
        id: 2,
        name: "Rice",
        price: 60,
        quantity: 0,

    },
    {
        id: 3,
        name: "Pulses",
        price: 100,
        quantity: 0,

    },
    {
        id: 4,
        name: "Sugar",
        price: 45,
        quantity: 0,

    },
    {
        id: 5,
        name: "Flour",
        price: 40,
        quantity: 0,

    },
    {
        id: 6,
        name: "Turmeric",
        price: 200,
        quantity: 0,

    },
    {
        id: 7,
        name: "Coffee",
        price: 2500,
        quantity: 0,

    },
    {
        id: 8,
        name: "Pista",
        price: 850,
        quantity: 0,

    },
]

export default function App(){

    const [groceryItem, setGroceryItems] = useState([]);

    function handleGrocery(newItem){
        setGroceryItems( newItem.filter((obj) => obj.quantity) );
    }

    return (
        <div className="container">
            <h1>Grocery List</h1>
            <OptionList />
            <FormContainer onHandleGrocery={handleGrocery}/>
            <AddedItems groceryItem = {groceryItem}/>
        </div>
    )
}

function OptionList(){
    return (
        <ul className="guide">
                {tasks.map((task,i) => <List task={task} key={i}/>)}
        </ul>
    );
}
function List({task}){
    return (
        <li>{task}</li>
    );
}

function FormContainer({onHandleGrocery}){
    const [groceryItem, setGroceryItem] = useState("default");
    const [itemQuantity, setItemQuantity] = useState("");

    function addItemsToTable(){
        if(groceryItem === "default" || itemQuantity === "" || itemQuantity === 0){
            
            window.alert("select the item with quantity");
            return;
        }
        const newItem = items.filter((it) => (it.name === groceryItem) ? it.quantity += itemQuantity : it);
        onHandleGrocery(newItem);
    }
    return (
        <form className="form-container" onSubmit = { (e) => {e.preventDefault()}}>
            <select placeholder="select item" onChange = {(e) => setGroceryItem(e.target.value) } value={groceryItem}>
                <option value="default">Select Items</option>
                {
                    items.map((item) => <ListItem item = {item} key={item.id}/>)
                }
            </select>

            <input type="text" placeholder="Enter Quantity" onChange={(e)=>setItemQuantity(Number(e.target.value))} value={itemQuantity} />
            <button onClick={addItemsToTable}>Add</button>
        </form>
    );
}

function ListItem({item}){
    return (
        <option value={item.name}>{item.name}-{item.price}</option>
    );
}

function AddedItems({groceryItem}){
    const len = groceryItem.length;
    const total = groceryItem.reduce( (accumulator,currValue) => 
            accumulator + currValue.quantity*currValue.price,0
    );
    return(
        <table className="table-container">
            <thead>
                <tr>
                    <th>Sr No</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            
                {
                    len === 0 ?
                    <tbody>
                        <tr>
                            <td colSpan="3" className="no-items-list">No items added yet</td>
                        </tr> 
                        <Total>00.00</Total>
                    </tbody>
                    : 
                    <tbody>
                        {
                            groceryItem.map( (item , i) => <AddItems item = {item} key={i} index={i}/> )
                        }
                        <Total>{total}</Total>
                    </tbody>
                    
                }            
        </table>
    );
}

function AddItems({item , index}){
    return(
        <tr>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td className="added-list-items">{item.price}*{item.quantity}</td>
        </tr>
    );
}

function Total({children}){
    return (
        <tr className="list-items">
            <td colSpan="2">Total</td>
            <td>{children}</td>
        </tr>
    );
}