import { useEffect, useState } from "react";
import "./style.css";
import { petsDataSource } from "../../core/dataSource/remoteDataSource/pets";
import { productDataSource } from "../../core/dataSource/remoteDataSource/products";
import { orderDataSource } from "../../core/dataSource/remoteDataSource/orders";
import Nav from "../../components/common/Nav";

function Dashboard() {
  const [petStats, setPetStats] = useState({});
  const [productStats, setProductStats] = useState({});
  const [orderStats, setOrderStats] = useState({});
  const getPetStats = async () => {
    try {
      const response = await petsDataSource.petStats();
      setPetStats(response);
    } catch (err) {
      console.log(err);
    }
  };
  const getProductStats = async () => {
    try {
      const response = await productDataSource.productStats();

      setProductStats(response);
    } catch (err) {
      console.log(err);
    }
  };
  const getOrderStats = async () => {
    try {
      const response = await orderDataSource.orderStats();
      console.log(response.stats);
      setOrderStats(response.stats);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPetStats();
    getProductStats();
    getOrderStats();
  }, []);
  return (
    <div className="dashboard">
      <Nav />
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h3>Pet Stats</h3>
          <div className="dashboard-stat-cards">
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfPetsByType?.dogs}</h4>
              <p>Dogs</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfPetsByType?.cats}</h4>
              <p>Cats</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfAdoptedPets}</h4>
              <p>Adopted Pets</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfAvailablePets}</h4>
              <p>Avialable Pets</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfFoundPets}</h4>
              <p>Found Pets</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{petStats?.totalNumberOfLostPets}</h4>
              <p>Lost Pets</p>
            </div>
          </div>
        </div>
        <div className="dashboard-stat">
          <h3>Product Stats</h3>
          <div className="dashboard-stat-cards">
            <div className="dashboard-stat-card">
              <h4>{productStats?.totalNumberOfProducts}</h4>
              <p>Products</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{productStats?.averagePrice?.toFixed(2)}</h4>
              <p>Average product price</p>
            </div>
          </div>
        </div>
        <div className="dashboard-stat">
          <h3>Order Stats</h3>
          <div className="dashboard-stat-cards">
            <div className="dashboard-stat-card">
              <h4>{orderStats?.averageOrderTotal || 0}</h4>
              <p>Average order total</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalOrdersToday || 0}</h4>
              <p>Total Orders Today</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalOrdersThisWeek || 0}</h4>
              <p>Total Orders this Week</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalOrdersThisMonth || 0}</h4>
              <p>Total Orders this Month</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalRevenueToday || 0}</h4>
              <p>Total Revenue Today</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalRevenueThisWeek || 0}</h4>
              <p>Total Revenue this Week</p>
            </div>
            <div className="dashboard-stat-card">
              <h4>{orderStats?.totalRevenueThisMonth || 0}</h4>
              <p>Total Revenue this Month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
