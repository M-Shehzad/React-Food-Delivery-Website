import React from 'react';
import {Link} from 'react-router-dom';

export default function Register(){
    return(
        <div className="center">
            <h1 className="heading">Register</h1>
            <form action="/register" method="post">
                <div className="textField">
                    <input type="text" name="username" id="username" autocomplete="off"  required />
                    <label for="username">Username</label>
                </div>
                <div className="textField">
                    <input type="password" name="password" id="password" autocomplete="off" required />
                    <label for="password">password</label>
                </div>
                <div className="textField">
                    <input type="email" name="email" id="email" autocomplete="off" required />
                    <label for="email">email</label>
                </div>
                <button className="btn">Register</button>
            </form>
            <div className='signupLink'>Already a member? <Link to='/login'className="subheading">Login</Link></div>
        </div>)
}