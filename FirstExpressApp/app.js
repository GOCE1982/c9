var express = require("express");
var app = express();

app.get(('/'), function(req, res){
    res.send("Hi there!");
});

app.get(("/bye"), function(req, res){
    res.send("Goodbye!");
});

app.get(("/dog"), function(req, res){
    res.send("WOOF!");
});

app.get("/r/:subName/comments/:id/:title", function(req, res){
    console.log(req.params);
    res.send("Welcome to the comments section");
});

app.get("/r/:subName/", function(req, res){
    var subname = req.params.subName;
    res.send("Welcome to the " + subname.toUpperCase() + " section");
});

app.get("*", function(req, res) {
    res.send("invalid request");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});