import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "pizzas/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "pizzas/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "pizzas/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "pizzas/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "pizzas/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "pizzas/prosciutto.jpg",
      soldOut: false,
    },
  ];
  

function App(){
    return (
        <div className='container'>
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    // const style = {
    //     color: "red",
    //     fontSize: "48px",
    //     textTransform: "uppercase"
    // }
    // <h1 style={style}>This is how you can add inline css</h1>
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    const pizzas = pizzaData;
    const numPizzas = pizzas.length;
    return (
        <main className="menu">
            <h2>Our Menu</h2>
            {
                numPizzas > 0 ? 
                <>
                    <p>
                    Authentic Italian cuisine. 6 creative dishes to choose from.
                    All from our stone oven, all organic, all delicious.
                    </p>

                    <ul className="pizzas">
                        {
                            pizzaData.map((pizza) => {
                                return <Pizza obj={pizza} key={pizza.name}/>;
                            })
                        }
                    </ul>
                </>
            : <p>We'r still working on our menu. Please come back later :)</p>
            }
            {/* <Pizza 
                name="Pizza Spinaci"
                ingredient='Tomato, mozarella, ham, aragula, and burrata cheese'
                photoName='pizzas/spinaci.jpg'
                price={250}
            />

            <Pizza 
                name="Pizza Funghi"
                photoName='pizzas/funghi.jpg'
                ingredient="Tomato, mushrooms"
                price={100}
            /> */}
            
        </main>
    );
}

function Pizza(props){
    //instead of using props.obj.photoName, props.obj.name everytime for every different values 
    // we can destruct the props simply by below line or also we can do the same in the component parameter itself like in footer component
    const {obj} = props; //destructing props 
    console.log(obj);

    return (
       <li className={`pizza ${obj.soldOut ? "sold-out" : ""}`}>
           <img src={obj.photoName} alt={obj.name}></img>
           <div>
            <h3>{obj.name}</h3>
            <p>{obj.ingredients}</p>
            {/* {
                obj.soldOut?
                <span>SOLD OUT</span>
                :
                <span>{obj.price}</span>
            } */}
            <span>{
                obj.soldOut ? "SOLD OUT" : obj.price
                }</span>
           </div>
       </li>
    );
}

function Footer(){
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;

    const isOpen = hour >= openHour && hour <= closeHour;
    console.log(isOpen);
    return (
        <footer className="footer">
            {
                //enter js mode 
                isOpen ? 
                (<Order openHour={openHour} closeHour={closeHour}/>)
                :
                (<p>Sorry we'r closed now please comeback at {openHour}:00 😘</p>)
            }
        </footer>
    )
}
// destructring props in Order component
function Order({openHour,closeHour}){
    return (
        <div className="order">
            <p>We'r open from {openHour}:00 to {closeHour}:00. Come visit us or order online</p>
            <button className="btn">Order</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
