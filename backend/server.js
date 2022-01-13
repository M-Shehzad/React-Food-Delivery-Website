const express = require("express");

const app = express();

// var mysql      = require('mysql');
// var db = mysql.createConnection({
//   host     : 'bbseynlhpr0e3hporhjk-mysql.services.clever-cloud.com',
//   user     : 'uorcv6k7fx8uyrbe',
//   password : 'QD54Z5MQC3NqltxUlowJ'
// });

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '876a876a876A',
  database: 'fooddelivery'
});

db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db.threadId);
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.get('/menuItem',(req,res)=>{
  let sql = 'SELECT * FROM MENU';
  db.query(sql,(err,result)=>{
    if(err) throw err;
    res.json(result);
  });
});

app.post('/login',(req,res)=>{
  console.log(req.body)
  const {username,password} =req.body;
  let sql=`SELECT username FROM registry WHERE username='${username}' and password='${password}' `;
  db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result.length)
    if(result.length){
      res.json('success')
    }
    else{
      res.json('Invalid');
    }
  })
})

app.post('/register',(req,res)=>{
  const {username,password,email} =req.body;
  let sql=`SELECT username FROM registry WHERE EXISTS (SELECT username FROM registry WHERE username ='${username}')`;
  db.query(sql,(err,result)=>{
    if(err) throw err;
    if (result.length){
      res.send('username already exists');
      console.log(result);
    }
    else{
      db.query(`INSERT INTO registry VALUES ('${username}','${password}','${email}')`,(err,result)=>{
        if(err) throw err;
        res.redirect('/');
      })
    }
  })
})


app.post('/orderhistory',(req,res)=>{
  const {username} =req.body;
  let orderHistory=[];
  console.log(username);
  let sql = `
  SELECT orders.*,payment.payment_type,payment.payment_amt
  FROM orders
  INNER JOIN payment
  ON orders.order_id=payment.order_id
  JOIN customer
  ON orders.cust_id=customer.cust_id
  WHERE customer.username='${username}';`;
  db.query(sql,async(err,result)=>{
    if(err) throw err;
    orderHistory=[...result];
    
    for (let item of orderHistory){
      sql=`select order_from.*,menu.price from order_from 
      JOIN menu
      ON order_from.ITEM_NAME = menu.ITEM_NAME
      WHERE ORDER_ID=${item.ORDER_ID};`
      if (!item.ITEMS){
        item.ITEMS=[];
      }
      await new Promise((resolve) => {
        db.query(sql,(err,result)=> {
          if (err) throw err;
          item.ITEMS.push(...result);
          resolve();
        });
      })
    }
    res.json(orderHistory);
  })
})


app.post('/order',(req,res)=>{
  const {ITEMS,address,payment_type,user} =req.body;
  console.log(ITEMS);
  console.log(user);
  console.log(address);
  console.log(payment_type);
  //initializing the order with cust_id
  let sql = `INSERT INTO ORDERS (CUST_ID)
    SELECT (CUST_ID) FROM customer
    WHERE USERNAME='${user}';`
  db.query(sql,(err,result)=>{
    if(err) throw err;
    //inserting the miscellenous values
    sql =`UPDATE orders
    SET ORDER_TIME=NOW(),ADDRESS='${address}'
    WHERE ORDER_ID = LAST_INSERT_ID();`;
    db.query(sql,(err,result)=>{
      if (err) throw err;
      console.log('Order Inserted!');
    })
    //insertion of payment
    sql=`INSERT INTO payment values(LAST_INSERT_ID(),'${payment_type}',NULL);`;
    db.query(sql,(err,result)=>{
      if(err) throw err;
      console.log('payment sucessful!');  
    })
    //mapping all the items ordered
    ITEMS.map(item=>{
      sql=`INSERT INTO order_from values(LAST_INSERT_ID(),'${item.ITEM_NAME}',${item.quantity});`;
      db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log('item inserted!');
      })
    })

  })

})

app.listen(4000,()=>{
    console.log('server started?');
});