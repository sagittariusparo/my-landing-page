import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <div className="menu">
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
      </div>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/signin" className="signin">
              Sign In
            </Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        ) : (
          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
