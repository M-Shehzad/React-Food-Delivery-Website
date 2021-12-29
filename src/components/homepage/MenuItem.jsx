import React from 'react';
import './MenuItem.css';
import image from '../food.png';

export default function MenuItem(props){
    //console.log(props)
    return (
        <div className='box'>
            <img src={image} alt="" />
            <h3>{props.ITEM_NAME}</h3>
            <span><i className="fas fa-rupee-sign"></i>{props.PRICE}</span>
            <button onClick={()=>props.addProduct(props)} className='btn'>Add to cart</button>
        </div>
    )
}