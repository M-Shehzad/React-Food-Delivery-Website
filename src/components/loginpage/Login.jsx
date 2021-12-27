import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

export default function LogState(){
        return(
        <div class="center">
            <h1 class="heading">Login</h1>
            <form action="/login" method="post">
                <div class="textField">
                    <input type="text" name="username" id="username" autocomplete="off" required />
                    <label for="username">Username</label>
                </div>
                <div class="textField">
                    <input type="password" name="password" id="password" autocomplete="off" required />
                    <label for="password">password</label>
                </div>
                <button class="btn">Login</button>
            </form>
            <div class='signupLink'>Not a member? <Link  to='/register'class="subheading">Register</Link></div>
        </div>)
}