var express=require("express");
var config=require("./config");
//Creating express session
var session=require('express-session');
var cors=require("cors");
var bodyParser=require("body-parser");
var app=express();

var https=require("https")
app.use(cors());

//Write an algo to generate secret key
//creating session options
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    duration: 30*60*1000,
    activeDuration: 5*60*1000,
    httpOnly:true,
    secure: true,
    ephemeral:true
}))

//&& req.session.admin after =="email"
var auth = function(req,res,next){
    if(req.session && req.session.email === "admin@email.com")
        return next();
    else
        return res.sendStatus(401);
}




//application /something followed by json, that is why application/*+json
//This is in case of unsecured connection
app.use(bodyParser.json({type: 'application/*+json'}))


//In case of secured use foll for body parser
//app.use(bodyParser.json())


//Generally body-parser is for request


//The page below doesn't have any auth check

app.get("/test",function(request,response) {
	response.send("Testing express .. ")
})


app.post('/login',function(request,response){

	//These are optional.We are doing here to put restrictions on the data,who can access etc
	response.setHeader('Access-Control-Allow-Origin','*');
	response.setHeader('Access-Control-Allow-Methods','GET','POST');
	//response.header allows us to set multiple values whereas setHeader allows us to set one value
	//In serviceLib.js we have put 'Content-Type':'application/x-www-form-urlencoded', which may change to json
	response.header("Access-Control-Allow-Headers","X-Requested-With,Content-Type");
	response.setHeader("Access-Control-Allow-Credentials","true");
    
    if((!request.query.email) && (!request.query.password))
        response.end("Login failed");
    else
    {
       request.session.email=request.query.email;
       request.session.password=request.query.password;
       response.end("Login Success")
    }
    
      response.end("Object recieved successfully")
})


app.get('/logout',function(request,response){
    request.session.destroy();
    response.send("logout success!")
})

app.set('port',config.port)


//unsecured connection
app.listen(app.get('port'),function(){
	console.log('Server started at '+app.get('port'));
})