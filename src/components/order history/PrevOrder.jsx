import React, { useEffect, useState, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../Contexts';

import OrderItem from './OrderItem';
import './prevOrder.css';

export default function PrevOrder(){
    let navigate = useNavigate();
    const [logState,setLogState] = useContext(UserContext);
    const [prevOrders,setPrevOrders] = useState([]);
    

    useEffect(()=>{

        if(logState){
            const fetchData = async()=>{let res = await fetch('/orderhistory',{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({
                username:logState
            })
        })
        let data = await res.json();
        setPrevOrders(data);}
        fetchData();
        }
        else{
            alert('You are not logged in!');
            navigate('/login');
        }
    },[logState])
    
    if (!prevOrders) {
        return (<div></div>)
    }
    return(<>
    <h1 className="heading">Your orders</h1>
    {prevOrders.length===0 && (
        <h1 className="subheading">You have not made any orders yet.</h1>
        )}
    {prevOrders.map((order)=>{
        return <OrderItem 
        key = {order.ORDER_ID}
        ORDER_ID = {order.ORDER_ID}
        ADDRESS={order.ADDRESS}
        ORDER_TIME={order.ORDER_TIME}
        PAYMENT_AMT={order.payment_amt}
        PAYMENT_TYPE ={order.payment_type}
        ITEMS = {order['ITEMS']}
        />
    })}
    </>)
}
