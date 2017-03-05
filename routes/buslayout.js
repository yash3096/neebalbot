var request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    request({
        method: 'GET',
        url: 'http://developer.goibibo.com/api/bus/seatmap/?app_id=9df38fc0&app_key=ca022dba99032bd557ed56c0ddd2b06f&format=json&skey=noJUPRkbd-cGk2JL26iD4f8X6tAFm5FONpvkHOCDKpZYDCkwJSQOqTCmTHZPvC5w'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            console.dir(object, {depth: null, colors: true})
            res.send(object);
        }
    });
});

module.exports = router;
