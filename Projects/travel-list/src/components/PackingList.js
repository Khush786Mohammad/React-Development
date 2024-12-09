import { useState } from "react";
import Item from "./Item";


export default function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
    const [sortBy, setSortBy] = useState('input');
    let sortedItems;

    if (sortBy == 'input')
        sortedItems = items;
    else if (sortBy == 'description')
        sortedItems = items.slice().sort((a, b) => { return a.description.localeCompare(b.description); });

    else
        sortedItems = items.slice().sort((a, b) => { return Number(a.packed) - Number(b.packed); });

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => <Item value={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />)}
            </ul>
            <div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={() => { onClearItems(); }}>Clear List</button>
            </div>
        </div>
    );
}
