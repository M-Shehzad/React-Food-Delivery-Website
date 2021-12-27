import Navbar from './components/Navbar';
import Menu from './components/homepage/Menu';
import Login from './components/loginpage/Login';
import Register from './components/loginpage/Register';
import { BrowserRouter, Routes,Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function App() {

  const [menuData, setmenuData] = useState([{}]);

  useEffect(() => {
    fetch('/menuItem')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setmenuData(data)
      });

  }, [])

  return (<>
    <BrowserRouter>
        <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element ={
          <Menu
          menuData = {menuData} />
        } />
      </Routes>
    </BrowserRouter>
  </>)
}

export default App;
