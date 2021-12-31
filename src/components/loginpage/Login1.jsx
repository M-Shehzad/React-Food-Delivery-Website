import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

export default function LogState(){
        return(
        <div className="center">
            <h1 className="heading">Login</h1>
            <form action="/login" method="post">
                <div className="textField">
                    <input type="text" name="username" id="username" autocomplete="off" required />
                    <label for="username">Username</label>
                </div>
                <div className="textField">
                    <input type="password" name="password" id="password" autocomplete="off" required />
                    <label for="password">password</label>
                </div>
                <button className="btn">Login</button>
            </form>
            <div className='signupLink'>Not a member? <Link  to='/register'className="subheading">Register</Link></div>
        </div>)
}