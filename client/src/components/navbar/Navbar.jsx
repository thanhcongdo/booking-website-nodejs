import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">TravelBooking</span>
        </Link>
          
        { user ? user.username : (  
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }} className="navButton">Login</Link>
          </div>
          
        )}  
      
      </div>
    </div>
  );
};
<script type="text/babel" src="./Navbar.jsx"></script>
export default Navbar;
