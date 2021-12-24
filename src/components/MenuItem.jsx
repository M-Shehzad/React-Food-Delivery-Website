import React from 'react';
import './MenuItem.css'
import image from './food.png';

export default function MenuItem(props){
    console.log(props)
    return (
        <div className='box'>
            <img src={image} alt="" />
            <h3>{props.name}</h3>
            <span><i className="fas fa-rupee-sign"></i>{props.price}</span>
            <a href="" className='btn'>Add to cart</a>
        </div>
    )
}