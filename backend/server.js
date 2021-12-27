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


app.get('/menu',(req,res)=>{
  let sql = 'SELECT * FROM MENU';
  db.query(sql,(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
});

app.get('/shit',(req,res)=>{
  res.send('this shit works!');
});

app.listen(4000,()=>{
    console.log('server started?');
});