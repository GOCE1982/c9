var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      Campground.find({name: regex}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else {
             if(allCampgrounds.length < 1) {
                 noMatch = "No such Campground has been found, please try again...";
             }
            res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch: noMatch});
         }
      });
        } else {
            Campground.find({}, function(err, allCampgrounds){
                if(err){
                    console.log(err);
                } else {
                    res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch: null});
                }
            });
        }
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var price = req.body.price;
    var createdAt = req.body.body;
    var newCampground = {name:name, image:image, description:desc, author:author, price:price, createdAt:createdAt};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            // newCampground.author.id = req.user._id;
            // newCampground.author.username = req.user.username;
            res.redirect("/campgrounds/" + newlyCreated.id);
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); 
});
// SHOW route
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground not found!");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else {
                res.render("campgrounds/edit", {campground: foundCampground});
            }
        });
});

// UPDATE route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
// DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;