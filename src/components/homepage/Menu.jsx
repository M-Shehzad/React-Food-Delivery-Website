import React from 'react';
import MenuItem from './MenuItem';

export default function Menu(props){
    return (
    <section className='dishes'>
    <h3 className='subheading'>Our dishes</h3>
    <h1 className='heading'>Menu</h1>
    <div className="box-container">
    {props.menuData.map((data)=>{
      console.log(data.ITEM_NAME);
      return (<MenuItem 
      key = {data.ITEM_NAME}
      name = {data.ITEM_NAME}
      price = {data.PRICE}
      />)
    })}
    </div>
  </section>)
}