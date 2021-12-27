import React from 'react';
import {Link} from 'react-router-dom';

export default function Register(){
    return(
        <div class="center">
            <h1 class="heading">Register</h1>
            <form action="/register" method="post">
                <div class="textField">
                    <input type="text" name="username" id="username" autocomplete="off"  required />
                    <label for="username">Username</label>
                </div>
                <div class="textField">
                    <input type="password" name="password" id="password" autocomplete="off" required />
                    <label for="password">password</label>
                </div>
                <div class="textField">
                    <input type="email" name="email" id="email" autocomplete="off" required />
                    <label for="email">email</label>
                </div>
                <button class="btn">Register</button>
            </form>
            <div class='signupLink'>Already a member? <Link to='/login'class="subheading">Login</Link></div>
        </div>)
}