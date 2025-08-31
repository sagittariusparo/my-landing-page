import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="menu">
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
      </div>
      <div className="auth-buttons">
        <button className="signin">Sign In</button>
        <button className="register">Register</button>
      </div>
    </header>
  );
};

export default Header;
