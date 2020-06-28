const router= require('express').Router();
const Student=require('../../db');
const path=require('path');
const fs=require('fs');

var nodemailer=require('nodemailer');

var transporter= nodemailer.createTransport({
    service:'gmail',
    auth: {
       user: 'mlhomefriend@gmail.com',
       pass: 'mlhome99'
    },
    logger: true
});

//Building list of filtering process
const all_branches = ['CO','IT','SE','MC','MCE','EC','EE','EP','ME','PE','AE','CE','PS','BT','EN','MPAE','ICE'];
const all_batches = ['2K17','2K18'];
const all_colleges = ['DTU','NSIT'];


//For serving the data as requested by user
router.post('/',function(req,res){
    console.log(req.body);
    obj=req.body;
    //For storing the data from the message bodu of request
    var branch_list=[];
    var batch_list=[];
    var college_list=[];

    //Iterating over the json object
    for(var key in obj){
        var current_value=obj[key];
        //If branch add in branch list
        if(all_branches.indexOf(current_value)>=0){
            if(current_value=='MC') branch_list.push('MCE');
            branch_list.push(current_value);
        }
        // else if batch , add in batch list
        else if(all_batches.indexOf(current_value)>=0){
                batch_list.push(current_value);
            }
        // else if college , add in college list
        else if(all_colleges.indexOf(current_value)>=0){
            college_list.push(current_value);
        }
    }

    console.log(branch_list);
    console.log(batch_list);
    console.log(college_list);

    Student.findAll({
        attributes: ['sname','College','Branch','Batch','Email','Phone'],
        where:{
            College: college_list,
            Branch: branch_list,
            Batch: batch_list
        }
    })
    .then(function(students){
        // console.log(students +'this data found');
        res.send(students);
    })
    .catch(function(err){
        console.log(err+' some error');
        res.status(500).send({
            error:'Could not retrieve data.'
        })
    })
});

//Route for sending email
router.post('/email',function(req,res){
    console.log(req.body);
    //Once the promise function is resolved then print the output of the promise function
    sendEmail(req.body.email,req.body.name,req.body.template_content,req.body.template_subject)
    .then(function(op){
        console.log(op);      //resolve part in sendEmail
        res.send(op)
    })
    .catch(function(err){
        console.log('---------------------')
        console.log(err);
        res.send(err)
    })
})

function sendEmail(email,name,content,sub){
    console.log(email);
    console.log(name);
    console.log(content);
    console.log(sub);
    
    return new Promise(function(resolve,reject){
        
        var mailOptions={
            from: 'sanyamg99@gmail.com',
            to: 'sanyamg99@yahoo.co.in',
            subject:sub,
            text: '',
            html: content
        }

        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                // invoke catch part
                resolve(error);
            }else{
                resolve('Email send');
            }
        })
        //When the message is delivered then do resolve(mesage), to notify the user that it has been done executing
    });
}

//Router for returning value of template file
router.post('/template',function(req,res){
    //File path for template email
    console.log(req.body.name);
    console.log(req.body.option);
    var filePath=path.join(__dirname+'/template'+req.body.option+'.html');
    var contents=fs.readFileSync(filePath).toString();   //reading the content of html template file created
    console.log(contents);
    //var name=toTitleCase(req.body.name);
    contents="<h4>Dear, "+req.body.name+"</h4>"+ contents;
    console.log(contents);
    res.send(contents);
});

function toTitleCase(str){
    return str.replace(
        /\w\S*/g,
        function(txt){
            return txt.charAt(0).toUpperCase()+ txt.substr(1).toLowerCase();
        }
    );
}


//Route for login
router.post('/login',function(req,res){
    console.log(req.body.name);
    console.log(req.body.pass);
    if(req.body.name=='user' && req.body.pass=='pass'){
        res.send('Success');
    }else{
        res.send('Failure');
    }
});

module.exports=router;