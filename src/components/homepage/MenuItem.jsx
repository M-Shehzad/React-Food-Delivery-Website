import React from 'react';
import './MenuItem.css';
// import image from '../food.png';

export default function MenuItem(props){
    //console.log(props)
    if (!props.ITEM_NAME) {
        return (<div></div>)
    }
    return (
        <div className='box'>
            <img src={require(`../item_img/${props.ITEM_NAME}.png`).default} alt="" />
            <h3 className='item-name'>{props.ITEM_NAME}</h3>
            <span className='item-price'><i className="fas fa-rupee-sign"></i>{props.PRICE}</span>
            <button onClick={()=>props.addProduct(props)} className='btn'>Add to cart</button>
        </div>
    )
}