const express = require("express");

const app = express();

app.listen(4000,()=>{
    console.log('server started?')
})

app.get('/shit',(req,res)=>{
    res.send('this shit works!');
})