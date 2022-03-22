import React from 'react';

export default function LatestSalestd(props){
    const time = new Date(props.order_time).toLocaleString();
    return(<tr className='salestr'>
                <td className="salesCell">{props.order_id}</td>
                <td className="salesCell customer">{props.name}</td>
                <td className="salesCell">{time}</td>
                <td className="salesCell ">{props.address}</td>
                <td className="salesCell amount"><i className="fas fa-rupee-sign"></i>{props.price}</td>
            </tr>)
}