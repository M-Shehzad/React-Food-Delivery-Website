import React from 'react';
import './prevOrder.css';

export default function PrevOrder(){
    return(<>
        <h1 className="heading">Your orders</h1>
        <section className="previous-orders">
            <div className="order-details">
                <h1><i className="fas fa-receipt"></i>ORDER#12324</h1>
                <div>
                    <p>Ordered on Sun, May 30, 2021, 03:51 PM</p>
                    <p>Delivered to kuntikana street</p>
                </div>
            </div>
            <div className="prev-items">
                <h2>Items</h2>
                <ul>
                    <li><div>Butter chicken <span>x2</span></div><span id="price">₹345</span></li>
                    <li><div>Chicken kadai <span>x3</span></div><span id="price">₹543</span></li>
                </ul>
                <div className="checkout">
                    <h1 className="checkout-title">sub total</h1>
                    <h1 className="total-amount"><i className="fas fa-rupee-sign"></i>₹654</h1>
                </div>
            </div>
        </section>
    </>)
}
