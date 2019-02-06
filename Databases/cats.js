var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Cat.create({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// }, function(err,cat){
//     if(err){
//         console.log("Something went wrong!");
//     } else {
//         console.log("The cat is saved to the DB!");
//         console.log(cat);
//     }
// });
 
// var george = new Cat({
//     name:"George",
//     age: 10,
//     temperament: "Grouchy"
// });
// george.save(function(err,cat){
//     if(err){
//         console.log("Something went wrong!");
//     } else {
//         console.log("The cat is saved to the DB!");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Snowball",
//     age: 4,
//     temperament: "Nice"
// }, function(err, cat){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats){
    if(err){
        console.log("Oh no, ERROR!");
        console.log(err);
    } else {
        console.log(cats);
    }
});

// Cat.remove({_id: "5c20c31876ac450c914a406d"}, function(err,cats){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(cats);
//     }
// });