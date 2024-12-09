function Item({ value, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input type="checkbox" value={value.packed}
                onChange={() => { onToggleItem(value.id); }} />
            <span style={value.packed ? { textDecoration: "line-through" } : {}}>{value.quantity} {value.description}</span>
            <button onClick={() => onDeleteItem(value.id)}>❌</button>
        </li>
    );
}

export default Item;
