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
    },
    {
        id: 2,
        name: "Rice",
        price: 60,
    },
    {
        id: 3,
        name: "Pulses",
        price: 100,
    },
    {
        id: 4,
        name: "Sugar",
        price: 45,
    },
    {
        id: 5,
        name: "Flour",
        price: 40,
    },
    {
        id: 6,
        name: "Turmeric",
        price: 200,
    },
    {
        id: 7,
        name: "Coffee",
        price: 2500,
    },
    {
        id: 8,
        name: "Pista",
        price: 850,
    },
]

export default function App(){
    let grocery = [];

    function handleGrocery(gro, quant){
        grocery = [...grocery, items.filter((it) => (it.name === gro))];
        console.log(grocery);
    }
    return (
        <div className="container">
            <h1>Grocery List</h1>
            <OptionList />
            <FormContainer onHandleGrocery={handleGrocery}/>
            <AddedItems grocery={grocery}/>
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
        onHandleGrocery(groceryItem, itemQuantity);
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

function AddedItems(){
    return(
        <table className="table-container">
            <thead>
                <th>Sr No</th>
                <th>Item Name</th>
                <th>Quantity</th>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="3" className="no-items-list">No items added yet</td>
                </tr>
                <tr className="list-items">
                    <td colSpan="2">Total</td>
                    <td>00.00</td>
                </tr>
            </tbody>
        </table>
    );
}

function AddItems(){
    return(
        <tr>

        </tr>
    );
}