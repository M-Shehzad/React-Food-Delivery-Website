const express = require("express");

const app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'bbseynlhpr0e3hporhjk-mysql.services.clever-cloud.com',
  user     : 'uorcv6k7fx8uyrbe',
  password : 'QD54Z5MQC3NqltxUlowJ'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.listen(4000,()=>{
    console.log('server started?');
});

app.get('/shit',(req,res)=>{
    res.send('this shit works!');
});