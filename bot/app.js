/*
 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');

 var index = require('./routes/index');
 var users = require('./routes/users');

 var app = express();

 // view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 // uncomment after placing your favicon in /public
 //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
 app.use(logger('dev'));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(cookieParser());
 app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', index);
 app.use('/users', users);

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });

 // error handler
 app.use(function(err, req, res, next) {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
 });

 module.exports = app;
 */


var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================
var request = require('request');
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: 'f38a54aa-1035-4ecb-a496-f4cfac1432a1',
    appPassword: 'hiFONx3POpFH6fanSGtWz9i'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

var luisAppId = "ea67f83f-236a-4bd0-876e-3de70f2c4196";
var luisAPIKey = "70abdbd74dae431abbc02eb52c083c00";

var luisAPIHostName = process.env.LuisAPIHostName || 'api.projectoxford.ai';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

var to;
var from;
var when;
var city;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
//var intents = new builder.IntentDialog({ recognizers: [recognizer] })
bot.dialog('/', new builder.IntentDialog({ recognizers: [recognizer] })
        .matches('AboutCab', [


//var toLoc = builder.EntityRecognizer.findEntity(args.entities, 'ToLocation');
//var fromLoc = builder.EntityRecognizer.findEntity(args.entities, 'FromLocation');

            //builder.Prompts.text(session, "To?");
            function(session, args) {

                var toLoc = builder.EntityRecognizer.findEntity(args.entities, 'Location::ToLocation');
                session.send("Cabs");
                if (!toLoc) {
                    session.beginDialog('/askTo', args);
                    //    next();
                }
                //   else
                //        next();
            }

            //builder.Prompts.text(session, "From?");
          /*  function(session, args) {
           var fromLoc = builder.EntityRecognizer.findEntity(args.entities, 'Location::FromLocation');

           if (!fromLoc) {
           // session.beginDialog('/askFrom', args);
           }
           }*/


        ])

        .matches('AboutRestaurant', [
            function (session) {

                builder.Prompts.text(session, "City?");
            },
            function (session, results) {
                if (results && results.response) {
                    // User answered question.
                    city= results.response;
                    // builder.Prompts.text(session, "From?");
                } else {
                    // User said nevermind.
                    session.send("OK. Goodbye.");
                }
                session.send('Looking for hotels in %s',city)
                request({
                    method: 'GET',
                    url: 'http://b1b1366e.ngrok.io/hoteldetails?city='+city,
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var object = JSON.parse(body);
                        console.dir(object, {depth: null, colors: true})
                        session.send('%s',JSON.stringify(body));
                    }
                });
            }
        ])
        .matches('AboutFlight', (session, args) => {
        session.send('Flight');

var toLoc = builder.EntityRecognizer.findEntity(args.entities, 'Location::ToLocation');

if (!toLoc) {
    session.beginDialog('/askFrom', args);
    //    next();
}
})
.matches('AboutMovies', (session, args) => {
    session.send('Hi! This is the AboutMovies intent handler. You said: \'%s\'.', session.message.text);
})

.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
}));



bot.dialog('/askTo',[
    function (session) {

        builder.Prompts.text(session, "To?");
    },
    function (session, results) {
        if (results && results.response) {
            // User answered question.
            to= results.response;
            builder.Prompts.text(session, "From?");
        } else {
            // User said nevermind.
            session.send("OK. Goodbye.");
        }
    },
    function (session, results) {
        if (results && results.response) {
            // User answered question.
            from= results.response;
        } else {
            // User said nevermind.
            session.send("OK. Goodbye.");
        }
        session.send('Booking cab from %s to %s', from, to);
        request({
            method: 'GET',
            url: 'http://b1b1366e.ngrok.io/bus?to='+to+'&from='+from,
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                console.dir(object, {depth: null, colors: true})
                session.send('%s',JSON.stringify(body));
            }
        });

    }
]);

bot.dialog('/askFrom',[
    function (session) {

        builder.Prompts.text(session, "To?");
    },
    function (session, results) {
        if (results && results.response) {
            // User answered question.
            to= results.response;
            builder.Prompts.text(session, "When?");
        } else {
            // User said nevermind.
            session.send("OK. Goodbye.");
        }
    },
    function (session, results) {
        if (results && results.response) {
            // User answered question.
            when= results.response;
        } else {
            // User said nevermind.
            session.send("OK. Goodbye.");
        }
        session.send('Booking flight to %s on %s', to, when);

        request({
            method: 'GET',
            url: 'http://b1b1366e.ngrok.io/flights?to='+to+'&when='+when,
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var object = JSON.parse(body);
                console.dir(object, {depth: null, colors: true})
                //session.send(""+body.departure);
                session.send('%s',JSON.stringify(body));
            }
            else
            {
                session.send('error');
            }
        });
    }
]);

/*bot.dialog('/askFrom',[
 function (session) {

 builder.Prompts.text(session, "From?");
 },
 function (session, results) {
 if (results && results.response) {
 // User answered question.
 session.send("Hello1 %s.", results.response);
 } else {
 // User said nevermind.
 session.send("OK. Goodbye.");
 }
 }
 ])*/

//=========================================================
// Bots Dialogs
//=========================================================

//bot.dialog('/', intents);