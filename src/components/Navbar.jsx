import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import './Navbar.css';
import { UserContext } from "../UserContext";

export default function Navbar(){
    const [logState,setLogState] = useContext(UserContext);
    return(<>
    <header>
        <Link to='/' className="logo"><i className="fas fa-utensils"></i>Kudla Eats</Link>

        {/* <nav className="navbar">
            <a href="">Menu</a>
            <a href="">Deliveries</a>
        </nav> */}

        <div>
            <Link to='user'>{logState}</Link>
        <Link to='cart'>
        <i className="fas fa-shopping-cart icons"><span className="cart-length">3</span></i>
        </Link>
        <Link onClick={()=>setLogState()} to='/login' id='loginlink'>{logState?'Logout':'Login'}</Link>
        </div>
    </header>
    </>)
}