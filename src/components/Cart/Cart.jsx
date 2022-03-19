import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './CartItem';
import './Cart.css';
import CartItem from './CartItem';
import { UserContext } from '../../Contexts';
export default function Cart(props){
    let navigate = useNavigate();
    const [logState,setLogState] = useContext(UserContext);
    const totalPrice = props.cartItems.reduce((price,item)=>price+item.quantity*item.PRICE,0)
    const [address,setAddress] = useState('');
    const [payment,setPayment] = useState('Cash');


    async function order(){
        if (logState){
            let res = await fetch('/order',{
                method:'POST',
                headers:{
                    'content-Type':'application/json'
                },
                body:JSON.stringify({
                ITEMS:props.cartItems,
                user:logState,
                address:address,
                payment_type:payment
            })
            })
            let data = await res.json()
            if(data==='success'){
                alert('Your Order has been registered!');
                props.cartClearance();
            }
        }
        else{
            alert('You are not Logged in!');
            navigate('/login');
        }
    }
    
    return(<section className="cart">
    <h1 className="heading">Your Orders</h1>
    <div className="header">
        <h3 className="cart-title">Orders</h3>
        <h5 onClick={()=>props.cartClearance()} className="Action">Remove all</h5>
    </div>
    {props.cartItems.length===0 && (
        <h1 className="noitems">No items are added.</h1>
        )}
    {props.cartItems.map((item)=>{
        return (<CartItem 
        key = {item.ITEM_NAME}
        ITEM_NAME = {item.ITEM_NAME}
        PRICE = {item.PRICE}
        quantity = {item.quantity}
        addProduct = {props.addProduct}
        removeProduct = {props.removeProduct}
        />)

    })}
    {props.cartItems.length!==0
    &&(<><div className="checkout">
        <h1 className="checkout-title">sub total</h1>
        <h1 className="total-amount"><i className="fas fa-rupee-sign"></i>{totalPrice}</h1>
        </div>
        <div className='addresspay'>
            <span className='subheading'>Payment</span>
            <select onChange={(e)=>setPayment(e.target.value)} name="payment" id="pay-type" value={payment} required>
                <option value="Cash">Cash</option>
                <option value="Debit">Debit</option>
                <option value="UPI">UPI</option>
            </select>
            <h1>Address</h1>
            <textarea onChange={(e)=>setAddress(e.target.value)} name="address" id="address" cols="30" rows="10" value={address} required></textarea>
        </div>
        <div className='order-btn'>
        <button onClick={()=>order()} className=' btn'>Order</button>
        </div>
        </>)}
        
</section>)
}