import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CryptoPrices from "./CryptoPrices";
import MetaConnect from "./MetaConnect";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/crypto" element={<CryptoPrices />} />
      <Route path="/meta" element={<MetaConnect />} />
    </Routes>
  );
}

export default AllRoutes;
