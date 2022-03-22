import React, { useContext, useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { UserContext,adminContext } from '../../Contexts';
import './Login.css';

export default function LogState(){
    const [isAdmin,setIsAdmin] = useContext(adminContext);
    const [logState,setLogState] = useContext(UserContext);

    const navigate =useNavigate();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

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
            if(data['username']===username){
                navigate('/');
                setLogState(username);
                setIsAdmin(data['isAdmin']);
                alert('Login Sucessful!');
            }
            else{
                alert('Invalid username or password!');
            }
        })

    }


    return(
    <div className="center">
        <div className="tabs-container">

        {/* <h1 className={!isAdmin?"tab active":"tab"} onClick={()=>setIsAdmin(false)}>Login</h1>
        <h1 className={isAdmin?"tab active":"tab"} onClick={()=>setIsAdmin(true)}>admin</h1> */}
        <h1 className="heading">Login</h1>
        </div>
        <form>
            <div className="textField">
                <input onChange={(e)=> setUsername(e.target.value)} type="text" name="username" id="username" autoComplete="off" required  value={username}/>
                <label>Username</label>
            </div>
            <div className="textField">
                <input onChange={(e)=> setPassword(e.target.value)} type="password" name="password" id="password" autoComplete="off" required value={password}/>
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