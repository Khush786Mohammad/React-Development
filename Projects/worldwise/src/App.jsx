import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import HomePage from "./Pages/HomePage";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from "./Components/Form";

import { CitiesProvider } from "./contexts/CitiesContext";

function App(){
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={ <AppLayout /> }>
            <Route index element={<Navigate  to="cities" replace/>} />
            <Route path="cities" element={<CityList/>} />
            {/* ⭐⭐⭐ passing params to react router in URL */}
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList/>} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;