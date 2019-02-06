var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", { useNewUrlParser: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
}); 

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var user = mongoose.model("user", userSchema);

var Post = mongoose.model("Post", postSchema);

// var newUser = new user({
//     email: "hermione@hogwarst.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Go to potions class"
// });

// newUser.save(function(err, User){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(User);
//     }
// });

user.findOne({name: "Hermione Granger"}, function(err, User){
    if(err){
        console.log(err);
    } else {
        User.posts.push({
            title: "Three things I really hate",
            content: "Voldemort, Voldemort, Voldemort"
        });
        User.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(User);
            }
        });
    }
});



// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are healthy"
// });

// newPost.save(function (err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });