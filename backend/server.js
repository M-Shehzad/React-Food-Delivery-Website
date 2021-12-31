const express = require("express");
const { send } = require("express/lib/response");

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
    res.send(result);
  });
});

app.get('/shit',(req,res)=>{
  res.send('yo this shit works!');
})

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
        res.redirect('/menu');
      })
    }
  })
})

app.listen(4000,()=>{
    console.log('server started?');
});