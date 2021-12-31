import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import './Login.css';

export default function LogState(){

    let navigate =useNavigate();
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    function login(username,password){
        console.log(username,password);
        fetch('/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data=='success'){
                navigate('/');
                alert('Login Sucessful!');
            }
            else{
                alert('Invalid username or password!');
            }
        })

    }


        return(
        <div className="center">
            <h1 className="heading">Login</h1>
            <form>
                <div className="textField">
                    <input onChange={(e)=> setUsername(e.target.value)} type="text" name="username" id="username" autocomplete="off" required  value={username}/>
                    <label>Username</label>
                </div>
                <div className="textField">
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" autocomplete="off" required value={password}/>
                    <label>password</label>
                </div>
                <button onClick={(e)=>{
                    e.preventDefault();
                    login(username,password);
                }} className="btn">Login</button>
            </form>
            <div className='signupLink'>Not a member? <Link  to='/register'className="subheading">Register</Link></div>
        </div>)
}