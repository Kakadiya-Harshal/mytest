import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.log("Error occured during fetching user detail:", error);
    }
  };

  return (
    <div>
      <h1>List of all Users</h1>
      <div className="main-div">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={(e) => {
              navigate(`/userDetails/${user.id}`);
            }}
            className="sub-div"
          >
            <div className="img-div">
              <img src={user.avatar} alt={user.first_name} />
            </div>
            <div className="details-div">
              <h3>
                {user.first_name} {user.last_name}
              </h3>
              <p>Email: {user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
