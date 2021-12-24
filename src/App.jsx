import Navbar from './components/Navbar'
import MenuItem from './components/MenuItem'
import React, { useEffect, useState } from 'react';
function App() {

  
  
  const [menuData,setmenuData] = useState([{}]);
  
  useEffect(()=>{
    fetch('/menu')
    .then(response=>response.json())
    .then(data=> {
      console.log(data)
      setmenuData(data)
    });
    
  },[])

  return <>
  <Navbar />
  <section className='dishes'>
    <h3 className='subheading'>Our dishes</h3>
    <h1 className='heading'>Menu</h1>
    <div className="box-container">
    {menuData.map((data)=>{
      console.log(data.ITEM_NAME);
      return (<MenuItem 
      key = {data.ITEM_NAME}
      name = {data.ITEM_NAME}
      price = {data.PRICE}
      />)
    })}
    </div>
  </section>
  </>
}

export default App;
