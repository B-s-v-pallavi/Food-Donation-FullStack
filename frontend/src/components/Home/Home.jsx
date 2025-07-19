import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from "./Restaurant"; // Ensure this component is defined
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    "https://thumbs.dreamstime.com/z/different-food-text-donate-wooden-background-top-view-donation-concept-184381799.jpg"
  );
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch restaurants when the restaurants section is shown
  useEffect(() => {
    if (showRestaurants) {
      axios
        .get("http://localhost:5000/api/restaurant")
        .then((res) => setRestaurants(res.data))
        .catch((err) =>
          console.error(
            "Error fetching restaurants:",
            err.response?.data || err.message
          )
        );
    }
  }, [showRestaurants]);

  const handleExplore = () => {
    if (!user) {
      // Redirect to login if not authenticated, passing the intended destination
      navigate("/login", { state: { from: "/restaurant-list" } });
    } else {
      // Show restaurants if logged in
      setShowRestaurants(true);
      setBackgroundImage(
        "https://img.freepik.com/premium-photo/thanksgiving-feast_820340-83052.jpg?w=1060"
      );
    }
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        padding: "2rem",
      }}
    >
      {!showRestaurants && (
        <div className="overlay">
          <h1>Welcome to Our Food Donation App</h1>
          <button className="explore-btn" onClick={handleExplore}>
            Explore Restaurants
          </button>
        </div>
      )}

      {showRestaurants && (
        <section>
          <h2 class="text-center">Restaurants</h2>
          <div className="restaurant-cards">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))
            ) : (
              <p>No restaurants available.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
