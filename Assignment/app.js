var express = require("express");
var app = express();

app.get(("/"), function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

var says = ['Oink', 'Moo!', 'Woof!'];

app.get(("/speak/:animal/"), function(req, res){
    var sounds = {
        pig: "Oink!",
        cow: "Moo!",
        dog: "Woof, woof!",
        cat: "I hate you hooman!",
        goldfish: "..."
    };
    var animal = req.params.animal.toLowerCase();
    var ans = sounds[animal];
    res.send("The " + animal + " says '" + ans + "'");
});

app.get(("/repeat/:word/:times"), function(req, res){
    var message = req.params.word;
    var times = Number(req.params.times);
    var result = " ";
    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    res.send(result);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is running");
});