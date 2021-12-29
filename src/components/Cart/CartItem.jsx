import React from 'react';
import image from '../food.png';
export default function(props){
    return(<div className="cart-container">

    <div className="cart-items">
        <div className="image-box">
            <img src={image} alt="" />
        </div>
        <div className="cart-item-about">
            <h1 className="cart-item-title">{props.ITEM_NAME}</h1>
        </div>
        <div className="counter">
            <button>-</button>
            <span className="item-count">{props.quantity}</span>
            <button onClick={()=>props.addProduct(props)}>+</button>
        </div>
        <div className="prices">
            <div className="item-amount"><i className="fas fa-rupee-sign"></i>{props.PRICE}</div>
        </div>
    </div>
</div>)
}