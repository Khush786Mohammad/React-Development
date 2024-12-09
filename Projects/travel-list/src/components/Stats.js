export default function Stats({ numsItems }) {

    if (!numsItems.length)
        return <p className="stats">Start adding some items to your packing list 🚀</p>;

    const nums = numsItems.length;
    const packed = numsItems.filter((items) => items.packed).length;
    const percentage = Math.round((packed / nums) * 100);
    return (
        <footer className="stats">
            <em>
                {percentage === 100 ? "You got everything! Ready to go ✈" : `💼 You have ${nums} items on your list, and you already packed ${packed} (${percentage}%)`}
            </em>
        </footer>
    );
}
