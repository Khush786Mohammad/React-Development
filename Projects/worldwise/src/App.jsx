import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState, useEffect} from "react";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";

const BASE_URL = "http://localhost:8000";

function App(){
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function(){
    async function fetchCities(){
       try{
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
       }
       catch(error){
        alert("There was an error loading data");
       }
       finally{
        setIsLoading(false);
       }
    }
    fetchCities();
  },[]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={ <AppLayout /> }>
            <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
            <Route path="form" element={<p>Form</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;