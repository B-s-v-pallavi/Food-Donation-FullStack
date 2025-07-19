import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./Restaurant.css";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-content">
        <h3 className="restaurant-name">{restaurant.name}</h3>
        <p className="restaurant-location">
          <FaMapMarkerAlt className="icon" /> {restaurant.location || "Location not available"}
        </p>
        <p className="restaurant-contact">
          <FaPhoneAlt className="icon" /> {restaurant.contact || "Contact not available"}
        </p>
      </div>
      <div className="restaurant-actions">
        <Link className="restaurant-link" to={`/admin/restaurant/${restaurant._id}`}>
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
