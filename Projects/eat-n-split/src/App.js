import {useState} from "react";
const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image:"https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
]

function Button({children, func}){
    // console.log(func);
    return <button className="button" onClick={func}>{children}</button>
}

export default function App(){
    const [showAddFriends, setShowAddFriends] = useState(false);
    const [friends, setFriends] = useState(initialFriends);

    function handleShowFriends(){
        setShowAddFriends(!showAddFriends);
    }

    function handleAddNewFriends(friend){
        setFriends((friends) => [...friends, friend]);
        setShowAddFriends(false);
    }
    
    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList friends = {friends}/>
                {showAddFriends && <FormAddFriend onHandleNewFriends={handleAddNewFriends}/>}
                <Button func = {handleShowFriends}>{showAddFriends ? `Close` : `Add Friend`}</Button>
            </div>
            <FormSplitBill />
        </div>
    );
}

function FriendsList({friends}){
    return (
        <ul>
            {
                friends.map((friend) => <Friend friend={friend} key={friend.id}/>)
            }
        </ul>
    )
}

function Friend({friend}){
    return <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {
            friend.balance < 0 ? <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>: (friend.balance === 0 ? <p>You and {friend.name} are even</p> : <p className = "green">{friend.name} owes you {friend.balance}$</p>)
        }
        <Button>Select</Button>
    </li>
}

function FormAddFriend({onHandleNewFriends}){

    const [user, addUser] = useState("");
    const [userId, setUserId] = useState("https://i.pravatar.cc/48");

    function addUserInList(){
        if(user && userId){
            const obj = {
                id: Date.now(),
                name: user,
                image: userId,
                balance: 0
            }
            onHandleNewFriends(obj);
            addUser("");
            setUserId("https://i.pravatar.cc/48");
        }
    }
    
    return (
        <form className="form-add-friend" onSubmit={(e)=>{e.preventDefault()}}>
            <label>👬 Friend name</label>
            <input type="text" onChange = {(e)=> addUser(e.target.value) } value = {user}/>
            <label>🌆 Image URL</label>
            <input type="url" onChange = {(e) => setUserId(e.target.value) } value = {userId}/>
            <Button func = {addUserInList}>Add</Button>
        </form>
    )
}

function FormSplitBill(){
    return (
        <form className="form-split-bill">
            <h2>Split A Bill With Anothony</h2>

            <label>💰 Bill value</label>
            <input type="text" />

            <label>🤵 Your expense</label>
            <input type="text" />
            <label>👬 Anthony's expense: </label>
            <input type = "text" disabled/>

            <label>🤑 Who is paying the bill?</label>
            <select>
                <option value='user'>You</option>
                <option value='friend'>Anthony</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    )
}