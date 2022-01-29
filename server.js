var mysql=require("mysql");
var express = require("express");
var cookie = require("cookie-parser");
var bodyparser = require("body-parser");
var multer = require("multer");
var fs = require("fs");
var app = express();
app.use(bodyparser.json());
app.listen(8081,function(){
console.log("server running at http://localhost:8081");
});
app.get("/",function(req,res){
    res.send("<h1>welcome to website</h1>")
});
app.post("/create",function(req,res){
    let body = req.body;
    let fname = body.data.fname;
    let lname = body.data.lname;
    var con = mysql.createConnection({
        host:"localhost",user:"root",password:"",database:"node"
    });
    con.connect(function(err){
        if(err){
            console.log("error")
        }
    });
    var query ="insert into users(fname,lname) values('" + fname + "', '"+ lname+"')";
    con.query(query,function(err,result){
        console.log ("inserted")
        res.end("success");
    });
    


});
