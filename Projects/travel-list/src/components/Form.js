import {useState} from "react";

const optionList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

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

export default Form;