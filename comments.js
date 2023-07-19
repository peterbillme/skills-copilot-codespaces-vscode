// Create web server
// By: fuchun

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// GET /comments
router.get('/', function(req, res, next) {
  res.render('comments', { title: 'Comments' });
});

// GET /comments/get
router.get('/get', function(req, res, next) {
  // res.send('respond with a resource');
  var jsonFile = path.join(__dirname, '../data/comments.json');
  fs.readFile(jsonFile, 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

// POST /comments/post
router.post('/post', function(req, res, next) {
  // res.send('respond with a resource');
  var jsonFile = path.join(__dirname, '../data/comments.json');
  fs.readFile(jsonFile, 'utf-8', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      var comment = req.body;
      comment.id = Date.now();
      comments.push(comment);
      fs.writeFile(jsonFile, JSON.stringify(comments, null, 4), function(err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(comments);
        }
      });
    }
  });
});

module.exports = router;