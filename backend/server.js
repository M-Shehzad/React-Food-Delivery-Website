const express = require("express");

const app = express();
const port = 4000;

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

  let sql='SELECT username,isAdmin FROM registry WHERE username=? and password=? ';
  sql = mysql.format(sql,[username,password])
  db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result)
    if(result.length){
      res.json(result[0])
    }
    else{
      res.json('Invalid');
    }
  })
})

app.post('/register',(req,res)=>{
  const {name, username, password, email, phone} =req.body;
  console.log('request received!')
  let sql=`SELECT username FROM registry WHERE EXISTS (SELECT username FROM registry WHERE username ='${username}')`;
  db.query(sql,(err,result)=>{
    if(err) throw err;
    if (result.length){
      console.log(result);
      res.json('username already exists');
    }
    else{
      db.query(`INSERT INTO registry (username,password,email) VALUES ('${username}','${password}','${email}')`,(err,result)=>{
        if(err) throw err;
      })
      db.query(`INSERT INTO customer (NAME,PHONE_NO,USERNAME) VALUES('${name}','${phone}','${username}');`,(err,result)=>{
        if(err) throw err;
        res.json('registered');

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
  WHERE customer.username=?;`;
  sql = mysql.format(sql,[username]);
  db.query(sql,async(err,result)=>{
    if(err) throw err;
    orderHistory=[...result];
    
    for (let item of orderHistory){
      sql=`select order_from.*,menu.price from order_from 
      JOIN menu
      ON order_from.ITEM_NAME = menu.ITEM_NAME
      WHERE ORDER_ID=?;`;
      sql=mysql.format(sql,[item.ORDER_ID]);
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
    WHERE USERNAME=?;`
    sql = mysql.format(sql,[user]);
    db.query(sql,(err,result)=>{
    if(err) throw err;
    //inserting the miscellenous values
    sql =`UPDATE orders
    SET ORDER_TIME=NOW(),ADDRESS=?
    WHERE ORDER_ID = LAST_INSERT_ID();`;
    sql = mysql.format(sql,[address])
    db.query(sql,(err,result)=>{
      if (err) throw err;
      console.log('Order Inserted!');
    })
    //insertion of payment
    sql=`INSERT INTO payment values(LAST_INSERT_ID(),?,NULL);`;
    sql = mysql.format(sql,[payment_type])
    db.query(sql,(err,result)=>{
      if(err) throw err;
      console.log('payment sucessful!');  
    })
    //mapping all the items ordered
    ITEMS.map(item=>{
      sql=`INSERT INTO order_from values(LAST_INSERT_ID(),?,?);`;
      sql = mysql.format(sql,[item.ITEM_NAME,item.quantity])
      db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log('item inserted!');
      })
    })

  })
  res.json('success');
});

// Admin routes
app.get('/msales',(req,res)=>{
  let sql = `
  select orders.order_id,DATE_FORMAT(ORDER_TIME,'%m-%Y') as month,count(*) as orders,sum(menu.price) as sales
  from orders
  JOIN order_from
  ON orders.ORDER_ID = order_from.ORDER_ID
  JOIN menu
  ON order_from.item_name=menu.item_name
  group by month(order_time),year(order_time)
  order by year(order_time),month(order_time) asc;
  `
  db.query(sql,(err,result)=>{
    if (err) throw err;
    res.json(result);
  })
});

app.get('/bestseller',(req,res)=>{
  let sql = `
  select ITEM_NAME, COUNT(*)*QTY as qty
  from order_from
  group by ITEM_NAME
  ORDER BY COUNT(*) DESC;
  `
  db.query(sql,(err,result)=>{
    if (err) throw err;
    res.json(result);
  })
});

app.get('/usercount',(req,res)=>{
  let sql=`
  select count(*) as total_users
  from customer;
  `
  db.query(sql,(err,result)=>{
    if (err) throw err;
    res.json(result);
  })
})

app.get('/latestSales',(req,res)=>{
  let sql=`
  select orders.order_id,customer.name,order_time,address,sum(menu.price) as price
  from orders
  JOIN customer
  on orders.cust_id = customer.cust_id
  join order_from
  on orders.order_id = order_from.order_id
  join menu
  on order_from.item_name = menu.item_name
  group by order_id
  order by order_time desc
  limit 10;
  `
  db.query(sql,(err,result)=>{
    if (err) throw err;
    res.json(result);
  })
})

app.listen(port,()=>{
    console.log('server started?');
});