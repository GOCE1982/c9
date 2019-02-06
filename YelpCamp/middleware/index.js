var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");
 
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You first need to be logged in!");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Sorry, that campground does not exist!");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You are not allowed to do that");
                    res.redirect('/campgrounds/' + req.params.id);
                }
            }
        });
    } else {
        res.redirect("back");
    }
};


middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found!");
                res.redirect("/campgrounds/" + req.params.id);
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin || req.user.isCamprgoundOwner) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect('/campgrounds/' + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in first to do that");
        res.redirect("back");
    }
};

middlewareObj.isAdmin = function(req, res, next) {
    if(req.user.isAdmin) {
      next();
    } else {
      req.flash('error', 'This site is now read only thanks to spam and trolls.');
      res.redirect('back');
    }
  };
  
middlewareObj.isCamprgoundOwner = function(req, res, next){
    if(req.isAuthenticated){
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
           if(foundCampground.author.id.equals(req.user.id)) {
                next(); 
           }
        }
      });  
    }
};

module.exports = middlewareObj;