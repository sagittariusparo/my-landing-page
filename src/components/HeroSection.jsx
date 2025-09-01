import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Plan Your Dream Trip</h1>
        <p>Discover iconic destinations and create AI-powered itineraries in seconds.</p>
        <div className="hero-buttons">
          <button onClick={() => navigate("/register")}>Get Started</button>
          <button onClick={() => navigate("/signin")} className="secondary-btn">
            Sign In
          </button>
        </div>
      </div>

      <div className="hero-images">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg"
          alt="Taj Mahal"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/74/Victoria_Memorial_Kolkata.jpg"
          alt="Victoria Memorial"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
          alt="Eiffel Tower"
        />
      </div>
    </section>
  );
};

export default HeroSection;
