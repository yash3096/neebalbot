var request = require('request');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    request({
        method: 'GET',
        url: 'https://developer.goibibo.com/api/voyager/?app_id=9df38fc0&app_key=ca022dba99032bd557ed56c0ddd2b06f&method=hotels.get_hotels_data&id_list=%5B833944651558160099%5D&id_type=_id'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            console.dir(object, {depth: null, colors: true})
            res.send(object);
        }
    });
});

module.exports = router;
