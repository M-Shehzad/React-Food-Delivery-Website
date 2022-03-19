import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../Contexts';

export default function Register(){

    const [name, setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phno, setphno] = useState('');

    const navigate =useNavigate();
    const [logState,setLogState] = useContext(UserContext);

    function register(){
        console.log(username,password);
        fetch('/register',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                username:username,
                password:password,
                email:email,
                phone:phno
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data=='registered'){
                navigate('/');
                alert('Registered Successfully!');
                setLogState(username);
            }
            else{
                alert(data);
            }
        })

    }


    return(
        <div className="center">
            <h1 className="heading">Register</h1>
            <form>
                <div className="textField">
                    <input onChange={(e)=> setName(e.target.value)} type="text" name="name" id="name" autoComplete="off"  required value={name} />
                    <label htmlFor="username">Name</label>
                </div>
                <div className="textField">
                    <input onChange={(e)=> setUsername(e.target.value)} type="text" name="username" id="username" autoComplete="off"  required value={username} />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="textField">
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" autoComplete="off" required value={password} />
                    <label htmlFor="password">password</label>
                </div>
                <div className="textField">
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" autoComplete="off" required value={email} />
                    <label htmlFor="email">email</label>
                </div>
                <div className="textField">
                    <input onChange={(e)=>setphno(e.target.value)} type="tel" name="phone" id="phone" autoComplete="off" required value={phno} />
                    <label htmlFor="Phone">Phone Number</label>
                </div>
                <button onClick={(e)=>{
                    e.preventDefault();
                    register();
                }}
                 className="btn">Register</button>
            </form>
            <div className='signupLink'>Already a member? <Link to='/login'className="subheading">Login</Link></div>
        </div>)
}