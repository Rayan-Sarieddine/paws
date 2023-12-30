import { useEffect, useState } from "react";
import "./style.css";
import { petsDataSource } from "../../core/dataSource/remoteDataSource/pets";
import { productDataSource } from "../../core/dataSource/remoteDataSource/products";
import { orderDataSource } from "../../core/dataSource/remoteDataSource/orders";

function Dashboard() {
  const [petStats, setPetStats] = useState({});
  const [productStats, setProductStats] = useState({});
  const [orderStats, setOrderStats] = useState({});
  const getPetStats = async () => {
    try {
      const response = await petsDataSource.petStats();
      setPetStats(response);
      console.log(response);
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
      setOrderStats(response);
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
    <div>
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
    </div>
  );
}

export default Dashboard;
