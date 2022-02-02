import React from 'react';
import image from '../food.png';


export default function CartItem(props){
    return(<div className="cart-container">

    <div className="cart-items">
            <div className="image-box">
                <img src={require(`../item_img/${props.ITEM_NAME}.png`).default} alt="" />
            </div>
            <div className="cart-item-about">
                <h1 className="cart-item-title">{props.ITEM_NAME}</h1>
            </div>
            <div className="counter">
                <button onClick={()=>props.removeProduct(props)}>-</button>
                <span className="item-count">{props.quantity}</span>
                <button onClick={()=>props.addProduct(props)}>+</button>
            </div>
        <div className="prices">
            <div className="item-amount"><i className="fas fa-rupee-sign"></i>{props.quantity*props.PRICE}</div>
        </div>
    </div>
</div>)
}