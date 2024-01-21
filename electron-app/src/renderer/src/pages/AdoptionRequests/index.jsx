import { useEffect, useState } from "react";
import { requestsDataSource } from "../../core/dataSource/remoteDataSource/requests";
import Nav from "../../components/common/Nav";
import "./style.css";
import { useNavigate } from "react-router";

function AdoptionRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  //Function to load all adoption requests
  const getRequests = async () => {
    try {
      const response = await requestsDataSource.loadRequests({ status: "PENDING" });
      setRequests(response.requests);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="get-requests">
      <Nav />
      <table className="requests-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Request Date</th>
            <th>Pet Name</th>
            <th>User Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests?.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-requests">
                No requests found
              </td>
            </tr>
          ) : (
            requests?.map((request) => {
              const date = new Date(request?.createdAt);
              return (
                <tr key={request?._id}>
                  <td>
                    <div className="request-user_details">
                      <img
                        src={`http://localhost:8000/images/users/${request?.user_id?.image}`}
                        alt="request-user-img"
                      />
                      <p>
                        {request?.user_id?.name} ({request?.status})
                      </p>
                    </div>
                  </td>
                  <td>{date?.toLocaleString()}</td>
                  <td>{request?.pet_id?.name}</td>
                  <td>{request?.user_id?.email}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate("/chat");
                      }}
                    >
                      Chat
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

export default AdoptionRequests;
