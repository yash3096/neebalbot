var request = require('request');
var express = require('express');
var router = express.Router();

function location(location,code)
{
    this.location=location;
    this.code=code;
}
var locations=[new location("Mumbai","BOM"),
    new location("Delhi","DEL"),
    new location("New York","FLU"),
    new location("Chennai","MAA"),
    new location("Paris","PHT"),
    new location("London","QQW"),
    new location("Sydney","BWU"),
    new location("San Diego","SAN"),
    new location("Kolkata","CCU"),
    new location("Portland","PWM"),
    new location("Rome","REO"),
    new location("Portland","PWM"),
    new location("Munich","AGB"),
    new location("Las Vegas","VGT"),
    new location("Los Angeles","VNY"),
    new location("Boulder","WBI"),
    new location("Madrid","MAD"),
    new location("Barcelona","BLA"),
    new location("San Rafael","AFA")
    ];
var departure="";
 var dest="";
/* GET home page. */
router.get('/', function(req, res, next) {
    dest=req.query.to;
    departure=req.query.when;

    locations.forEach(function getCode(currentElement,index,locations){if(currentElement.location==dest) { dest=currentElement.code} })

    console.log(dest, departure);
    request({
        method: 'GET',
        url: 'http://developer.goibibo.com/api/search/?app_id=9df38fc0&app_key=ca022dba99032bd557ed56c0ddd2b06f&format=json&source=BOM&destination='+dest+'&dateofdeparture='+departure+'&dateofarrival='+departure+'&seatingclass=B&adults=1&children=0&infants=0&counter=100',
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            //console.dir(object, {depth: null, colors: true})
             var objt={
             departure :object.data.returnflights[0].DepartureTime+"",
                 price: object.data.returnflights[0].PricingSolution.TotalPrice+"",
                 seatsavailable: object.data.returnflights[0].seatsavailable+"",
                 airline: object.data.returnflights[0].airline+""
             }
             console.log(objt);
              res.send(objt);
        }
    });
});

module.exports = router;
