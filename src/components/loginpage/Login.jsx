import React from 'react';
import './Login.css';

export default function LogState(){
        return(
        <div class="login">
            <h1 class="heading">Login</h1>
            <form action="/login" method="post">
                <div class="textField">
                    <input type="text" name="username" id="username" autocomplete="off" required />
                    <label for="username">Username</label>
                </div>
                <div class="textField">
                    <input type="text" name="password" id="password" autocomplete="off" required />
                    <label for="password">password</label>
                </div>
                <button class="btn">Login</button>
            </form>
            <div class='signupLink'>Not a member? <span class="subheading">Register</span></div>
        </div>)
}