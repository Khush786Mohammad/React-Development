const data = [
    {
      "id": "677",
      "name": "Air Force 1",
      "price": 6789,
      "src": "./src/assets/1.png"
    },
    {
      "id": "2342",
      "name": "Air Force LV8",
      "price": 7500,
      "src": "./src/assets/2.png"
    },
    {
      "id": "43134",
      "name": "Dunk High",
      "price": 7200,
      "src": "./src/assets/3.png"
    },
    {
      "id": "341345",
      "name": "Nike Air Max",
      "price": 8900,
      "src": "./src/assets/4.png"
    },
    {
      "id": "4656",
      "name": "Nike Dunk Low",
      "price": 6200,
      "src": "./src/assets/5.png"
    },
    {
      "id": "7564",
      "name": "Nike Run",
      "price": 5800,
      "src": "./src/assets/6.png"
    },
    {
      "id": "1234",
      "name": "Nike Revolution",
      "price": 5400,
      "src": "./src/assets/7.png"
    },
    {
      "id": "41367",
      "name": "Nike Zoom Vomero",
      "price": 9000,
      "src": "./src/assets/8.png"
    },
    {
      "id": "41367",
      "name": "Nike Zoom Invincible",
      "price": 8800,
      "src": "./src/assets/9.png"
    },
    {
      "id": "41367",
      "name": "Nike Lift",
      "price": 6700,
      "src": "./src/assets/10.png"
    }
  ]

import PropTypes from "prop-types";

ItemList.propTypes = {
  item: PropTypes.object
}

function Item(){
    return (
      <ul className="items">
              {/* <img src='./src/assets/1.png' alt="nike lift" width="100px" />
              <p>4400</p> */}

              {
                data.map((item) => <ItemList item={item} key={item.id}/>)
              }
      </ul>
    );
}

function ItemList({item}){
  return (
    <li className="shoes-list">
      <img src={item.src} alt={item.name} width="300px" height="300px"/>
      <div className="desc">
        <p>MRP : &#8377; {item.price}</p>
        <button>Add to cart</button>
      </div>
    </li>
  );
}

export default Item;