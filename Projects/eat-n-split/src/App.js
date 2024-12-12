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

    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowFriends(){
        setShowAddFriends(!showAddFriends);
    }

    function handleAddNewFriends(friend){
        setFriends((friends) => [...friends, friend]);
        setShowAddFriends(false);
    }
    
    function handleSelectedFriend(friend){
        setSelectedFriend((fr) => fr?.id===friend.id ? null : friend);
        setShowAddFriends(false);
    }

    function handleSplitBill(value){
        console.log(value);
        setFriends((friends) => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
        setSelectedFriend(null);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendsList 
                friends = {friends} 
                onHandleSelectedFriend={handleSelectedFriend}
                selectedFriend={selectedFriend}
                />

                {showAddFriends && <FormAddFriend
                onHandleNewFriends={handleAddNewFriends}
                />}

                <Button 
                func = {handleShowFriends}>
                {showAddFriends ? `Close` : `Add Friend`}
                </Button>

            </div>
            {selectedFriend && <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill = {handleSplitBill}
            />}
        </div>
    );
}

function FriendsList({friends, onHandleSelectedFriend, selectedFriend}){
    return (
        <ul>
            {
                friends.map((friend) => <Friend friend={friend} key={friend.id}
                onHandleSelectedFriend={onHandleSelectedFriend} 
                selectedFriend={selectedFriend}
                />)
            }
        </ul>
    )
}

function Friend({friend, onHandleSelectedFriend, selectedFriend}){
    const isSelected = selectedFriend?.id === friend.id;
    return <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {
            friend.balance < 0 ? <p className="red">You owe {friend.name} {Math.abs(friend.balance)}$</p>: (friend.balance === 0 ? <p>You and {friend.name} are even</p> : <p className = "green">{friend.name} owes you {friend.balance}$</p>)
        }
        <Button func={ () => onHandleSelectedFriend(friend)}>{isSelected ? `Close` : `Select`}</Button>
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
            <Button func = { ()=> addUserInList()}>Add</Button>
        </form>
    )
}

function FormSplitBill({selectedFriend, onSplitBill}){

    const [billValue , setBillValue] = useState("");
    const [myExpense, setMyExpense] = useState("");
    const paidByFriend = billValue ? billValue-myExpense : '';
    const [whoIsPaying, setWhoIsPaying] = useState("user");

    function handleBillValue(e){
        if(!Number(e.target.value)){
            setBillValue("");
            return;
        }
        setBillValue(Number(e.target.value));
    }

    function handleMyExp(e){
        if(!Number(e.target.value)){
            setMyExpense("");
            return;
        }
        setMyExpense(Number(e.target.value) > billValue ? myExpense : Number(e.target.value));
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!billValue || !myExpense) 
            return;
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -myExpense);
    }
    return (
        <form className="form-split-bill" onSubmit = { (e) => handleSubmit(e) }>
            <h2>Split A Bill With {selectedFriend.name}</h2>

            <label>💰 Bill value</label>
            <input type="text" onChange = { (e)=> handleBillValue(e) } value={billValue}/>

            <label>🤵 Your expense</label>
            <input type="text" onChange = { (e) => handleMyExp(e) } value={myExpense} />
            <label>👬 {selectedFriend.name}'s expense: </label>
            <input type = "text" value={paidByFriend} disabled/>

            <label>🤑 Who is paying the bill?</label>
            <select onChange = { (e) => setWhoIsPaying(e.target.value) } value={whoIsPaying} >
                <option value='user'>You</option>
                <option value={selectedFriend.name}>{selectedFriend.name}</option>
            </select>
            <Button>Split Bill</Button>
        </form>
    )
}