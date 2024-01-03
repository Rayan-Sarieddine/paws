import { useSelector } from "react-redux";
import "./style.css";
import { useEffect, useState } from "react";
import { orderDataSource } from "../../core/dataSource/remoteDataSource/orders";
import Nav from "../../components/common/Nav";

function OrderDetails() {
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  //Get selected order from redux
  const order = useSelector((state) => {
    return state.Order.curerntSelected;
  });

  //Function to change order status to cancelled
  const cancelOrder = async () => {
    try {
      const response = await orderDataSource.editOrder({ orderId: order._id, status: "REJECTED" });
      if (response.message === "Order updated successfully") {
        setMessage("Order Canceled");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("Failed to cancel the order");
    }
  };

  //Function to change order status to accepted
  const acceptOrder = async () => {
    try {
      const response = await orderDataSource.editOrder({ orderId: order._id, status: "ACCEPTED" });
      if (response.message === "Order updated successfully") {
        setMessage("Order ACCEPTED");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("Failed to accept the order");
    }
  };

  //Function to change order status to finished
  const finishOrder = async () => {
    try {
      const response = await orderDataSource.editOrder({ orderId: order._id, status: "DELIVERED" });
      if (response.message === "Order updated successfully") {
        setMessage("Order DELIVERED");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError("Failed to finish the order");
    }
  };

  //Reset for error and message
  useEffect(() => {
    setTimeout(() => {
      setError("");
      setMessage("");
    }, 2000);
  }, [error, message]);

  return (
    <div className="order-details">
      <Nav />
      <div className="order-details-content">
        <div className="checkout-cart-all-content">
          {order.items === 0 ? (
            <div className="center-div">
              <p className="checkout-cart-all-content-no-items">No items In Order</p>
            </div>
          ) : (
            <>
              <div className="order-user">
                <img
                  src={`http://localhost:8000/images/users/${order.user_id.image}`}
                  alt="user_image"
                />
                <p>{order.user_id.name}</p>
                <p className="message">{message}</p>
                <p className="error">{error}</p>
              </div>
              {order.items.map((item, index) => {
                return (
                  <>
                    <div key={item.product_id} className="checkout-cart-item">
                      <div className="cart-items-section">
                        <img
                          src={`http://127.0.0.1:8000/images/products/${item.image}`}
                          alt={item.name}
                        />
                        <div className="checkout-product-main-info">
                          <h4>{item.name}</h4>
                          <p>${item.total.toFixed(2)}</p>
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
              <div className="checkout-cart-total">
                <hr></hr>
                <div className="checkout-cart-total-value">
                  <span>TOTAL:</span>
                  <p>${order.totalAmount.toFixed(2)}</p>
                </div>
                <hr></hr>
                <div className="checkout-actions">
                  <div className="checkout-actions-coupon">
                    <span>Coupon:</span>
                    {order.couponCode ? (
                      <p>
                        "{order.couponCode}"-{order.discountAmount}$
                      </p>
                    ) : (
                      <p>No</p>
                    )}
                  </div>
                  <div className="checkout-action_btns">
                    <button
                      className="btn checkout-accept-btn"
                      onClick={() => {
                        acceptOrder();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => {
                        cancelOrder();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn finsih-btn"
                      onClick={() => {
                        finishOrder();
                      }}
                    >
                      Finish
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;
