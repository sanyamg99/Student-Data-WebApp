const sequelize=require('sequelize');

const db=new sequelize('pproject','root','260199',{
    dialect:'mysql'
});

const Student=db.define('student',{/* bla */
    sname:{
        type:sequelize.STRING
    },
    College:{
        type:sequelize.STRING
    },
    Branch:{
        type:sequelize.STRING
    },
    Batch:{
        type:sequelize.STRING
    },
    Email:{
        type:sequelize.STRING
    },
    Phone:{
        type:sequelize.STRING
    }
},{
    freezeTableName: true
});

//.sync() returns a promise function
db.sync().then(function(){
    /*Student.findAll({
        attributes: ['sname','College','Branch','Batch','Email','Phone']})
    .then(function(data){
        console.log(data);
    })*/
    console.log('Database has been connected');
}).catch(function(err){
    console.log(err+'Error connecting database');
});

 module.exports = Student;
