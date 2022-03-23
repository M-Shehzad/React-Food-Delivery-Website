import React,{useState,useEffect} from 'react';
import './admin.css'
import {Doughnut, Line,Pie} from 'react-chartjs-2';
import {Chart as Chartjs} from 'chart.js/auto';

import LatestSalestd from './LatestSaletd';

export default function Admin(){
  const [latestSales,setLatestSales] =  useState();
  const [revenue,setRevenue] = useState();
  const [salesData,setSalesData] = useState();
  const [bestSeller,setBestSeller] = useState();
  const [userCount,setUserCount] = useState();

  //fetching the total number of users
  useEffect(()=>{
    fetch('/usercount')
    .then(res => res.json())
    .then(data=>{
      setUserCount(data[0].total_users)
    })
  },[])

  //fetching data to present on the table
  useEffect(()=>{
    fetch('/latestSales')
    .then(res => res.json())
    .then(data=> setLatestSales(data))
  },[])
  console.log(latestSales);

  //fetching no. of sales per month
  useEffect(() => {
    fetch('/msales')
      .then(response => response.json())
      .then(data => {
        setRevenue(
          data.map((data)=>data.sales)
        )
        setSalesData({
          labels:data.map((data)=>data.month),
          datasets: [{
            label: 'No. of orders per month',
            data:data.map((data)=>data.orders),
            backgroundColor:'rgba(39, 174, 96,0.2)',
            fill:true,
            borderColor:'rgba(39,174,96,0.8)',//rgba(39,174,96,0.8)
            pointBackgroundColor: 'white',
            tension:0.4,
          }]
        });
      });
  }, [])


    
    //fetching and configuration of bestselling items for piechart use
    useEffect(()=>{
      fetch('/bestseller')
      .then(res=>res.json())
      .then(data=>{
        let labels = data.map((data)=>data.ITEM_NAME);
        const values = data.map((data)=>data.qty);
        const valueSum = values.reduce((a, b) => a + b, 0);
        const thresholdPercent = 8; //threshold percentage

        //calculating the slices as per the threshold
        const slices = values.map((v, i) => ({ label: labels[i], value: v }))
        .reduce((accumulator, currObj) => {
          const percent = 100 * currObj.value / valueSum;
          if (percent < thresholdPercent) {
            const others = accumulator.find(o => o.label == 'Others');
            if (!others) {
              return accumulator.concat({ label: 'Others', value: currObj.value });
            }
            others.value += currObj.value;
          } else {
            accumulator.push(currObj);
          }
          return accumulator;
        }, []);

        //color calculator
        function getRandomColorHex() {
          let hex = "0123456789ABCDEF";
          let color = "#";
          for (let i = 1; i <= 6; i++) {
            color += hex[Math.floor(Math.random() * 16)];
          }
          color+='80'//transparency value
          return color;
        }
        let colors = [];
        slices.map(i=>i.label).forEach((element) => {
          if(element == 'Others'){
            colors.push('#6e6e6e33');
          }else{
            colors.push(getRandomColorHex());
          }
        });
        

        setBestSeller({
          labels:slices.map(i=>i.label),
          datasets: [{
            label: 'BestSelling items',
            data:slices.map(i=>i.value),
            backgroundColor:colors,
            borderColor:colors.map(color=>color.slice(0,7))
          }]
        });
      })
    },[]);

    //catcher, if the data hasnt loaded yet
    if(!salesData | !bestSeller){
      return(<div></div>)
    }
    

  return (<section className='admin-Dashboard'>
    <div className="box-container">
      <div className='box'>
          <span className='feature-title'>Revenue</span>
          <span className='feature-value'><i className="fas fa-rupee-sign"></i>{revenue[revenue.length-1]-revenue[revenue.length-2]}</span>
          <span>Compared to last month</span>
      </div>
      <div className='box'>
          <span className='feature-title'>Users</span>
          <span className='feature-value'>{userCount}</span>
          <span>Total customers</span>
      </div>
      <div className='box'>
          <span className='feature-title'>Revenue</span>
          <span className='feature-value'><i className="fas fa-rupee-sign"></i>2,000</span>
          <span>Compared to last month</span>
      </div>
    </div>
    <div className="Charts">
      <div className="lineChart">
        <Line data={salesData} options={{
          hitRadius:30,
          hoverRadius:10,
          // responsive:true,
          scales:{
            y:{
              beginAtZero: true
            }
          }
        }}/>
      </div>
      <div className="pieChart">
        <h2 className='subheading'>Best Sellers</h2>
        <Doughnut data={bestSeller} options={{
          plugins:{
            legend:{
              display:false,
            }
          },
          hitRadius:30,
          hoverRadius:10,
          // responsive:true
        }}/>
      </div>
  </div>
  <div className="latestSales">
    <h3 className='table-title'>Latest Transactions</h3>
    <table className="sales-table">
      <tr className="salestr">
        <th className='salesth'>ORDER ID</th>
        <th className='salesth'>CUSTOMER</th>
        <th className='salesth'>DATE</th>
        <th className='salesth'>LOCATION</th>
        <th className='salesth'>AMOUNT</th>
      </tr>
      <tbody>
        {latestSales.map((cell)=>{
          return <LatestSalestd
          key = {cell.order_id}
          order_id = {cell.order_id}
          name = {cell.name}
          order_time = {cell.order_time}
          address = {cell.address}
          price = {cell.price}
          />
        })}
      </tbody>
    </table>

  </div>
  </section>)
}