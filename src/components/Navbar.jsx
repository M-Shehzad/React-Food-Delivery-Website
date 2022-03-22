import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import './Navbar.css';
import { UserContext,adminContext } from "../Contexts";

export default function Navbar(props){
    const [isAdmin,setIsAdmin] = useContext(adminContext);
    const [logState,setLogState] = useContext(UserContext);
    return(<>
    <header>
        <Link to='/' className="logo"><i className="fas fa-utensils"></i>Kudla Eats</Link>

        <nav className="navbar">
            {isAdmin?<Link className="navlink" to='/admin'>admin</Link>:''}
            <Link className="navlink" to='/orderHistory'>Order History</Link>
        </nav>

        <div className="navbar-items">
        <Link to='cart'>
        <i className="fas fa-shopping-cart icons"><span className="cart-length">{props.cartItems.length?props.cartItems.length:''}</span></i>
        </Link>
            {logState?<Link className="user" to='user'><i className="fas fa-user"></i>{logState}</Link>:''}
        <Link onClick={()=>{setLogState();setIsAdmin();}} to='/login' id='loginlink'>{logState?'Logout':'Login'}</Link>
        </div>
    </header>
    </>)
}