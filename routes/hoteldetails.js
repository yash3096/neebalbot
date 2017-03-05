var request = require('request');
var express = require('express');
var router = express.Router();
/*var fs = require('FileStream');*/
function City(city_name, city_id) {
    this.city_name = city_name;
    this.city_id = city_id;
}

var cities = [
    new City("Panvel","4761547441228189942"),
    new City("Melbourne","1307519440223746477"),
    new City("Amsterdam","2237336109214409162"),
    new City("Alexandria","161744743208871513"),
    new City("Barcelona","4091462887948187412"),
    new City("Navi Mumbai","1914808440588557366"),
    new City("Chennai","4354390963378411938"),
    new City("Kolkata","2066465017672827882"),
    new City("Bangalore","6771549831164675055"),
    new City("Pune","1554245012668028405"),
    new City("New Delhi","2820046943342890302"),
];

var city="";
var objt;
/* GET home page. */
router.get('/', function(req, res, next) {
    city=req.query.city;
    cities.forEach(function getCode(currentElement,index,cities){if(currentElement.city_name==city) { city=currentElement.city_id} })
    //console.log("\n\n\n\n"+city);

    request({

    method: 'GET',
 //takes city id and gives a hotels' list
        url: 'http://www.goibibo.com/hotels/search-data/?app_id=9df38fc0&app_key=ca022dba99032bd557ed56c0ddd2b06f&vcid=2066465017672827882&ci=20170401&co=20170403&r=1-1_0&pid=1',
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            //console.log(body);
            console.log(object);
            //var data=object.data;
            //console.log(data);
            var datakey=Object.keys(object);

            var tempData = object.datakey;
            console.log(tempData);
 //           console.dir(Object.keys(data), {depth: null, colors: true});
              /* objt= {
                   name: data.datakeys[0].hotel_geo_node.name + "",
                   latitude: data.datakeys[0].hotel_geo_node.location.lat + "",
                   longitude: data.datakeys[0].hotel_geo_node.location.long + "",
                   rating: data.datakeys[0].hotel_data_node.rating + "",
               };
           console.log("hello"+"\n"+datakeys);*/
            /*
            var objt={
                name: object.data.4325474491990470056.hotel_geo_node.name+"",
           /!*     latitude: object.data['city'].hotel_geo_node.location.lat+"",
                longitude: object.data['city'].hotel_geo_node.location.long+"",
               rating: object.data['city'].hotel_data_node.rating+"",
           *!/ }
            console.log("objt is getting printed"+objt);

            */
           // var fs = File
            res.send(object);
        }
    });
});

module.exports = router;
