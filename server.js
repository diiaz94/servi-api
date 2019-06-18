let express = require('express'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    //socket = require('./app/socket'),
    router = require('./app/routers/router'),
    /*adminRouter = require('./app/routers/adminRouter'),
    commerceRouter = require('./app/routers/commerceRouter'),
    customerRouter = require('./app/routers/customerRouter'),
    superadminRouter = require('./app/routers/superadminRouter'),
    ticketProcedure = require('./app/procedures/ticket'),
    billProcedure = require('./app/procedures/bill'),*/
    config = require('./config/main').get(process.env.NODE_ENV);

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    next();
});

let server = http.createServer(app);

/*
let io = require('socket.io')(http, {
    'pingInterval': 200,
    'pingTimeout': 10000,
    'origins': '*:*'
}).listen(server);*/

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    limit: '50mb'
}));

//DATABASE CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
}); // connect to our database
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + config.database);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


// ROUTES
router(app);
/*
adminRouter(app);
commerceRouter(app);
customerRouter(app);
superadminRouter(app);*/
//socket.events(io);
/*
ticketProcedure.init();
billProcedure.init();*/


app.set('port', (process.env.PORT || 3001));

// START THE SERVER
// =============================================================================
server.listen(app.get('port'), function() {
    console.log('Magic happens on port ', app.get('port'));
});

//TODO: Delete this
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});