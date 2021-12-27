import Navbar from './components/Navbar';
import Menu from './components/homepage/Menu';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function App() {

  const [menuData, setmenuData] = useState([{}]);

  useEffect(() => {
    fetch('/menu')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setmenuData(data)
      });

  }, [])

  return <>
    <BrowserRouter>
    <Navbar />
    <Menu
    menuData = {menuData} />
    </BrowserRouter>
  </>
}

export default App;
