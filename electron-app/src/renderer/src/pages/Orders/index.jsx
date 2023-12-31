import { useEffect, useState } from "react";
import "./style.css";
import { orderDataSource } from "../../core/dataSource/remoteDataSource/orders";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders, selectOrder } from "../../core/dataSource/localDataSource/order";
import Nav from "../../components/common/Nav";
function Orders() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orders = useSelector((state) => {
    return state.Order.orders;
  });
  const getOrders = async () => {
    try {
      const response = await orderDataSource.loadOrders({ status: "PENDING" });
      dispatch(loadOrders(response.orders));
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getOrders();
    console.log("hello");
  }, []);
  return (
    <div className="orders">
      <Nav />
      <table className="orders-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Order Date</th>
            <th>Number of items</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-orders">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => {
              const date = new Date(order.createdAt);
              return (
                <tr key={order._id}>
                  <td>
                    <div className="order-user_details">
                      <img
                        src={`http://localhost:8000/images/users/${order.user_id.image}`}
                        alt="order-user-img"
                      />
                      <p>
                        {order.user_id.name} ({order.status})
                      </p>
                    </div>
                  </td>
                  <td>{date.toLocaleString()}</td>
                  <td>{order.items.length}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        dispatch(selectOrder(order));
                        navigate("/order-details");
                      }}
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
