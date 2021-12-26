import Navbar from './components/Navbar';
import Menu from './components/homepage/Menu';
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
    <Navbar />
    <Menu
    menuData = {menuData} />
  </>
}

export default App;
