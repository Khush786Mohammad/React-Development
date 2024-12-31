import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./Pages/HomePage";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import NavBar from "./Pages/NavBar";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><NavBar /><HomePage /></>} />
        <Route path="/product" element={<><NavBar /><Product /></>} />
        <Route path="/pricing" element={<><NavBar /><Pricing /></>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;