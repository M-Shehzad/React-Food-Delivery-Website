import React from "react";

export default function OrderItem(props){
    if(!props.ITEMS) return null;
    const time = new Date(props.ORDER_TIME).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short',hour: 'numeric', minute: 'numeric', hour12: true })
    // const time = new Date (props.ORDER_TIME).toUTCString();
    return(<>
        <section className="previous-orders">
            <div className="order-details">
                <h1><i className="fas fa-receipt"></i>ORDER#{props.ORDER_ID}</h1>
                <div>
                    <p>Ordered on {time}</p>
                    <p>Delivered to {props.ADDRESS}</p>
                </div>
            </div>
            <div className="prev-items">
                <h2>Items</h2>
                <ul>
                    {props.ITEMS.map((item)=>{
                        return (<li><div>{item.ITEM_NAME} <span>x{item.QTY}</span></div><span id="price">₹{item.price}</span></li>)
                    })}
                </ul>
                <div className="checkout">
                    <h1 className="checkout-title">sub total</h1>
                    <h1 className="total-amount">₹{props.PAYMENT_AMT}</h1>
                </div>
            </div>
        </section>
    </>)
}
