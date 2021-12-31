import React from 'react';
import './CartItem';
import './Cart.css';
import CartItem from './CartItem';

export default function Cart(props){

    const totalPrice = props.cartItems.reduce((price,item)=>price+item.quantity*item.PRICE,0)

    return(<section className="cart">
    <h1 className="heading">Your Orders</h1>
    <div className="header">
        <h3 className="cart-title">Orders</h3>
        <h5 className="Action">Remove all</h5>
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
    {props.cartItems.length!==0 &&(<div className="checkout">
        <h1 className="subtotal">sub total</h1>
        <h1 className="total-amount"><i className="fas fa-rupee-sign"></i>{totalPrice}</h1>
    </div>)}
</section>)
}