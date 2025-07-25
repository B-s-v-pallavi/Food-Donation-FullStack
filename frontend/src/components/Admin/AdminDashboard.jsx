import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaTrashAlt } from "react-icons/fa"; // Import the icons
import "./AdminDashboard.css";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRestaurants = () => {
    axios
      .get("https://food-donation-fullstack.onrender.com/api/restaurant")
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data.message || err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://food-donation-fullstack.onrender.com/api/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRestaurants(restaurants.filter((restaurant) => restaurant._id !== id));
        alert("Restaurant deleted successfully!");
      })
      .catch((err) => {
        console.error("Error deleting restaurant:", err.response?.data || err.message);
        alert("Failed to delete restaurant.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <Link className="admin-btn" to="/admin/add-restaurant">
          Add Restaurant
        </Link>
        <Link className="admin-btn" to="/">
          Home
        </Link>
      </div>

      <div className="restaurant-list">
        <h2>All Restaurants</h2>
        {restaurants.length === 0 ? (
          <p>No restaurants found.</p>
        ) : (
          <div className="restaurant-card-container">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id} className="restaurant-card">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-location">
  <span className="highlight">Location:</span> {restaurant.location || "Location not available"}
</p>

                <p className="contact">
  <span className="highlight">Contact Info:</span> {restaurant.contact}
</p>

                <div className="restaurant-actions">
                  <Link className="details-btn" to={`/admin/restaurant/${restaurant._id}`}>
                    <FaEye className="action-icon" /> View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(restaurant._id)}
                    className="delete-btn"
                  >
                    <FaTrashAlt className="action-icon" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
