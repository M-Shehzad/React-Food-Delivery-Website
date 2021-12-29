import React from 'react';
import MenuItem from './MenuItem';

export default function Menu(props){
    return (
    <section className='dishes'>
    <h3 className='subheading'>Our dishes</h3>
    <h1 className='heading'>Menu</h1>
    <div className="box-container">
    {props.menuData.map((data)=>{
      // console.log(data.ITEM_NAME);
      return (<MenuItem 
      key = {data.ITEM_NAME}
      ITEM_NAME = {data.ITEM_NAME}
      PRICE = {data.PRICE}
      addProduct = {props.addProduct}
      />)
    })}
    </div>
  </section>)
}