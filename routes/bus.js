var request = require('request');
var express = require('express');
var router = express.Router();


function location(location,code)
{
    this.location=location;
    this.code=code;
}
var locations=[new location("Mumbai","BOM"),
    new location("Keshod","IXK"),
    new location("Chennai","MAA"),
    new location("Allahabad","IXD"),
    new location("Jammu","IXJ"),
    new location("Madurai","IXM"),
    new location("Leh","IXL"),
    new location("Kolkata","CCU"),
    new location("Ranchi","IXR"),
    new location("Silchar","IXS"),
    new location("Jaipur","JAI"),
    new location("Jodhpur","JDH"),
    new location("Delhi","DEL")
    /*new location("Los Angeles","VNY"),
    new location("Boulder","WBI"),
    new location("Madrid","MAD"),
    new location("Barcelona","BLA"),
    new location("San Rafael","AFA")*/
];

var dest="";
var from="";
/* GET home page. */
router.get('/', function(req, res, next) {
    dest=req.query.to;
    from=req.query.from;
    locations.forEach(function getCode(currentElement,index,locations){
        if(currentElement.location==dest) { dest=currentElement.code};
            if(currentElement.location==from) { from=currentElement.code};
        }

        )

    request({
        method: 'GET',
        url: 'http://developer.goibibo.com/api/bus/search/?app_id=9df38fc0&app_key=ca022dba99032bd557ed56c0ddd2b06f&format=json&source='+from+'&destination='+dest+'&dateofdeparture=20170201&dateofarrival=20170201',
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            //console.dir(object, {depth: null, colors: true});
            var objt = {
                departure: object.data.returnflights[0].DepartureTime,
                duration: object.data.returnflights[0].duration,
                pickupTime: object.data.returnflights[0].BPPrims.list[0].BPTime,
                pickupLocation: object.data.returnflights[0].BPPrims.list[0].BPLocation,
                busType: object.data.returnflights[0].BusType,
                totalFare: object.data.returnflights[0].fare.totalfare
            }
            res.send(objt);
        }
    });
});

module.exports = router;
