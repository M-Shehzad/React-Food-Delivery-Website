import React from 'react';

export default function Register(){
    return(
        <div class="center">
            <h1 class="heading">Register</h1>
            <form action="/login" method="post">
                <div class="textField">
                    <input type="text" name="username" id="username" autocomplete="off" />
                    <label for="username">Username</label>
                </div>
                <div class="textField">
                    <input type="text" name="password" id="password" autocomplete="off" />
                    <label for="password">password</label>
                </div>
                <div class="textField">
                    <input type="text" name="email" id="email" autocomplete="off" />
                    <label for="email">email</label>
                </div>
                <button class="btn">Login</button>
            </form>
            <div class='signupLink'>Already a member? <span class="subheading">Login</span></div>
        </div>)
}