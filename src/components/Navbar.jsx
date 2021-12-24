import React from "react";
import './Navbar.css';

export default function Navbar(){
    return(<>
    <header>
        <a href="" className="logo"><i className="fas fa-utensils"></i>Kudla Eats</a>

        <nav className="navbar">
            <a href="">Menu</a>
            <a href="">Deliveries</a>
        </nav>

        <div>
        <i className="fas fa-shopping-cart icons"></i>
        <a href="" id="signup">Sign up</a>
        </div>
    </header>
    </>)
}