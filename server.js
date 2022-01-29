var mysql = require("mysql");
var express = require("express");
var bodyparser = require("body-parser");
var cookie = require("cookie-parser");
var multer = require("multer");
var fs = require("fs");
var app = express();
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded());

app.listen = app.listen(8081,function(){
    console.log("server running at http://localhost8081");

});
app.get("/",function(req,res){
    res.send("<h1>welcome to crud project</h1>")
});
app.post("/save",function(req,res){
    let body = req.body;
    let id = body.data.id;
    let name = body.data.name;
   let email = body.data.email;
   let mobileno = body.data.mobileno;
   let city = body.data.city;
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"nodecrud"
    });
    con.connect(function(err){
        if(err){
            console.log("error")
        }
    });
    var query;
    if(id==0) {
       query= "insert into users(name,email,mobileno,city) values('"+name+"','"+ email+"','"+mobileno+"','"+city+"')";
}
   else{
  query= "update users set name='"+name+"',email='"+ email+"',mobileno='"+mobileno+"',city='"+city+"' where id="+id;
}

    
    con.query(query,function(err,result){
        console.log("inserted")
        res.send("success");
    });
});


app.post("/delete",function(req,res){
    let body = req.body;
    let id = body.data.id;
    var con = mysql.createConnection({
       host:"localhost",
        user:"root",
        password:"",
        database:"nodecrud"
    });
    con.connect(function(err){
        if(err){
            console.log("error")
        }
    });
    var query;
   query= "delete from users where id="+id;

    
    con.query(query,function(err,result){
        console.log("deleted")
        res.send("success");
    });
});


app.post("/get",function(req,res){
    let body = req.body;
    let id = body.data.id;
    
    var con = mysql.createConnection({
        host:"localhost",user:"root",password:"",database:"nodecrud"
       
    });
    con.connect(function(err){
        if(err){
            console.log("error")
        }
    });
    var query;
    if(id==0) {
       query= "select* from users";
    }
   else{
   query= "select* from users where id="+id;
}

    
    con.query(query,function(err,result){
        console.log("inserted")
        res.send({data:result});
    });
});