import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Plan Your Dream Trip</h1>
        <p>Vacation is fun but planning is tedious. You have fun and lets us do the planning for you</p>
       </div>

      <div className="hero-images">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg" alt="Taj Mahal" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Victoria_Memorial_situated_in_Kolkata.jpg" alt="Victoria Memorial" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" alt="Eiffel Tower" />
      </div>
    </section>
  );
};

export default HeroSection;
