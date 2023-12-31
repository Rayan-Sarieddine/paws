import { useState } from "react";
import "./style.css";
import { orderDataSource } from "../../core/dataSource/remoteDataSource/orders";

function Orders() {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const response = await orderDataSource.loadOrders({ status: "PENDING" });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return <div>index</div>;
}

export default Orders;
