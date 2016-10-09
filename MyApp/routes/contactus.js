var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('contactus', { validate: '' });
});
router.post('/', function(req, res, next) {
    req.assert('name', 'required').notEmpty();
    req.assert('text', 'required').notEmpty();
    var errors = req.validationErrors();
    if (errors) res.render('contactus', { validate: 'Full Name and Message are required' });
    else {
        var con = {
            name: req.body.name,
            type: req.body.type,
            message: req.body.text
        }
        fs.writeFile(__dirname + '/file.txt', JSON.stringify(con));
        res.render('index', { title: 'Thank You' });
    }
});

module.exports = router;