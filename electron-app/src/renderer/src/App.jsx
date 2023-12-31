import AddPet from "./pages/AddPet";
import AddProduct from "./pages/AddProduct";
import AdoptionRequests from "./pages/AdoptionRequests";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import EditPet from "./pages/EditPet";
import EditProduct from "./pages/EditProduct";

import OrderDetails from "./pages/OrderDetails";
import Orders from "./pages/Orders";
import Pets from "./pages/Pets";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import "./styles/index.css";
import { Route, Routes } from "react-router";
function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/adoption-requests" element={<AdoptionRequests />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-pet" element={<EditPet />} />
        <Route path="/edit-product" element={<EditProduct />} />

        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
