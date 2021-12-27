import React from 'react';
import '/Login.css';

export default function LogState(){
        return(
        <div class="center">
            <h1 class="heading">Login</h1>
            <form action="/login" method="post">
                <div class="textField">
                    <input type="text" name="username" id="username" autocomplete="off" />
                    <label for="username">Username</label>
                </div>
                <div class="textField">
                    <input type="text" name="password" id="password" autocomplete="off" />
                    <label for="password">password</label>
                </div>
                <button class="btn">Login</button>
            </form>
            <div class='signupLink'>Not a member? <span class="subheading">Register</span></div>
        </div>)
}