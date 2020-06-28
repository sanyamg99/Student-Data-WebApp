const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


app.use('/',express.static(__dirname+'/public'));
app.use('/api/students',require('./routes/api/students'))

app.listen(3000,function(){
    console.log('Server started.');
});