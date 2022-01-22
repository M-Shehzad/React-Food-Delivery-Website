import Navbar from './components/Navbar';
import Menu from './components/homepage/Menu';
import Login from './components/loginpage/Login';
import Register from './components/loginpage/Register';
import Cart from './components/Cart/Cart';
import PrevOrder from './components/order history/PrevOrder';
import { UserContext } from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
function App() {

  const [logState,setLogState] = useState();
  const [menuData, setmenuData] = useState([{}]);
  const [cartItems,setCartItems] = useState([]);

  useEffect(() => {
    fetch('https://fooddelivery-mysql.herokuapp.com/menuItem')
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setmenuData(data)
      });
        
  }, [])


  const addProduct= (product)=>{
    const ProductExist = cartItems.find((item)=>item.ITEM_NAME === product.ITEM_NAME);
    // console.log(product);
    // console.log(cartItems);
    if(ProductExist){
      // console.log(ProductExist);
      setCartItems(cartItems.map((item)=> item.ITEM_NAME === product.ITEM_NAME?
      {...ProductExist, quantity:ProductExist.quantity+1}:item));
    }else{
      setCartItems([...cartItems,{...product,quantity:1}]);
      // console.log(cartItems);
    }
  }

  const removeProduct=(product)=>{
    const ProductExist = cartItems.find((item)=>item.ITEM_NAME === product.ITEM_NAME);
    if(ProductExist.quantity===1){
      setCartItems(cartItems.filter((item)=>item.ITEM_NAME!==product.ITEM_NAME));
    }
    else{
      setCartItems(
        cartItems.map((item)=>
        item.ITEM_NAME ===product.ITEM_NAME
        ?{...ProductExist,quantity:ProductExist.quantity -1}
        :item
        )
      )
    }
  }

  const cartClearance = ()=>{
    setCartItems([]);
  }
  

  return (<>
    <BrowserRouter>
    <UserContext.Provider value={[logState,setLogState]}>
        <Navbar
        cartItems = {cartItems}
        />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element ={
          <Menu
          menuData = {menuData}
          addProduct={addProduct}
          removeProduct ={removeProduct} />
        } />
        <Route path='/cart' element={
          <Cart 
          cartItems={cartItems}
          addProduct={addProduct}
          removeProduct={removeProduct}
          cartClearance={cartClearance}
          />} />
        <Route path='/orderhistory' element={<PrevOrder />} />
      </Routes>
    </UserContext.Provider>
    </BrowserRouter>
  </>)
}

export default App;
