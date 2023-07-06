import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./UserDetails.css";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const userRef = useRef();
  const params = useParams();

  useEffect(() => {
    fetchUser(params.id);
  }, [params.id]);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      const data = await response.json();
      console.log(data);
      setUser(data.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const handleDownload = () => {
    const userElement = userRef.current;
    const width = userElement.offsetWidth;
    const height = userElement.offsetHeight;
  
    const canvas = document.createElement("canvas");
    canvas.width = width * 2; // Adjust canvas width
    canvas.height = height * 2; // Adjust canvas height
  
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff"; // Set background color if needed
    context.fillRect(0, 0, width * 2, height * 2); // Adjust fillRect dimensions
  
    const name = userElement.querySelector("h3").textContent;
    const email = userElement.querySelector("p").textContent;
  
    const dataURL = userElement.querySelector("img").src;
  
    const image = new Image();
    image.crossOrigin = "Anonymous";
  
    image.onload = () => {
      context.drawImage(image, height * 2, 0, height * 2, height * 2); // Adjust drawImage dimensions
  
      context.font = "16px Arial";
      context.fillStyle = "#000";
      context.fillText(name, 10, 20);
      context.fillText(email, 10, 40);
  
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "user_details.png";
      link.click();
    };
  
    image.src = dataURL;
  };
  

  if (!user) {
    return <div>It's Loading... please wait</div>;
  }

  return (
    <div className="user-details-container">
      <div ref={userRef} className="user-card">
        <h1>User Details</h1>
        <img src={user.avatar} alt={user.first_name} />
        <h3>
          {user.first_name} {user.last_name}
        </h3>
        <p>Email: {user.email}</p>
        
      </div>
      <button className="download-btn" onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default UserDetails;
