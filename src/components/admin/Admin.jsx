import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto';


export default function Admin(){

    const [salesData,setSalesData] = useState();

    useEffect(() => {
        fetch('/msales')
          .then(response => response.json())
          .then(data => {
            // console.log(data)
            setSalesData(data);
          });
            
      }, [])
    console.log(salesData);
    return (<>
        {/* <h1>{salesData}</h1> */}
    </>)
}