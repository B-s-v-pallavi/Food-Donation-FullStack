import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUtensils, FaMapMarkerAlt, FaPhone, FaChevronDown, FaChevronUp, FaArrowLeft } from "react-icons/fa";
import "./RestaurantDetails.css";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFoodItems, setShowFoodItems] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/restaurant/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data.message || err.message);
        setLoading(false);
      });
  }, [id]);

  const handleTake = async (foodItemName) => {
    const token = localStorage.getItem("token");
    await axios
      .delete(`http://localhost:5000/api/restaurant/${id}/fooditems/${foodItemName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const updatedFoodItems = restaurant.availableFoodItems.filter(
          (item) => item.name !== foodItemName
        );
        setRestaurant({ ...restaurant, availableFoodItems: updatedFoodItems });
      })
      .catch((err) => {
        console.error("Error taking food item:", err.response?.data || err.message);
        alert("Failed to take food item.");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  return (
    <div className="restaurant-details-page">
    <div className="restaurant-details-wrapper">
      <div className="restaurant-details-card">
        <h2 className="head">{restaurant.name}</h2>
  
        <p><FaMapMarkerAlt className="icon" /> <strong>Location:</strong> {restaurant.location}</p>
        <p><FaPhone className="icon" /> <strong>Contact:</strong> {restaurant.contact}</p>
  
        <h3 className="ht"><FaUtensils className="icon" /> Available Food Items</h3>
  
        {restaurant.availableFoodItems && restaurant.availableFoodItems.length > 0 ? (
          <>
            <button className="toggle-btn" onClick={() => setShowFoodItems(!showFoodItems)}>
              {showFoodItems ? <><FaChevronUp /> Hide Items</> : <><FaChevronDown /> View Items</>}
            </button>
  
            {showFoodItems && (
              <table className="food-items-table">
                <thead>
                  <tr>
                    <th className="co">Food Item</th>
                    <th className="co">Quantity</th>
                    <th className="co">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.availableFoodItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button className="take-btn" onClick={() => handleTake(item.name)}>
                          Take
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <p>No food items available.</p>
        )}
  
        <button onClick={() => navigate(-1)} className="back-btn">
          <FaArrowLeft /> Back
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default RestaurantDetails;
