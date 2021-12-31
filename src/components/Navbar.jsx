import React from "react";
import {Link} from 'react-router-dom';
import './Navbar.css';

export default function Navbar(){
    return(<>
    <header>
        <Link to='/' className="logo"><i className="fas fa-utensils"></i>Kudla Eats</Link>

        {/* <nav className="navbar">
            <a href="">Menu</a>
            <a href="">Deliveries</a>
        </nav> */}

        <div>
        <Link to='cart'>
        <i className="fas fa-shopping-cart icons"><span className="cart-length">3</span></i>
        </Link>
        <Link to='/login' id='loginlink'>Login</Link>
        </div>
    </header>
    </>)
}