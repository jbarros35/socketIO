var app = require('express')();
var http = require('http').createServer(app);
var https = require('https')
var socket = require('socket.io')(http);
var fs = require('fs');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    app.set('secure_port', process.env.PORT || 443);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    // Pass to next layer of middleware
    next();
});

var positions = [
{ position: {
  timestamp: "2020-03-02T10:49:04Z",
		trackerId: "21225635-6902-40a7-a11b-b79067ad45a3",
		reporterId: "21225635-6902-40a7-a11b-b79067ad45a3",
		ignition: false,
		altitude: 0,
		speed: 0,
		angle: 0,
		satellites: 0,
		assetId: "4afd3d6e-0b0a-48fa-a7c7-9b987739c610",
    latitude: 38.73336,
    longitude: -9.15095   
    }   
},
{position: {    
        timestamp: "2020-03-02T10:49:04Z",
		trackerId: "21225635-6902-40a7-a11b-b79067ad45a3",
		reporterId: "21225635-6902-40a7-a11b-b79067ad45a3",
		ignition: false,
		altitude: 0,
		speed: 0,
		angle: 0,
		satellites: 0,
		assetId: "4afd3d6e-0b0a-48fa-a7c7-9b987739c610",
        latitude: 38.73322,
        longitude: -9.15059
}},
{position:{
        timestamp: "2020-03-02T10:49:04Z",
		trackerId: "21225635-6902-40a7-a11b-b79067ad45a3",
		reporterId: "21225635-6902-40a7-a11b-b79067ad45a3",
		ignition: false,
		altitude: 0,
		speed: 0,
		angle: 0,
		satellites: 0,
		assetId: "4afd3d6e-0b0a-48fa-a7c7-9b987739c610",
    latitude: 38.73346,
    longitude: -9.15009
}},
{position: {
        timestamp: "2020-03-02T10:49:04Z",
		trackerId: "21225635-6902-40a7-a11b-b79067ad45a3",
		reporterId: "21225635-6902-40a7-a11b-b79067ad45a3",
		ignition: false,
		altitude: 0,
		speed: 0,
		angle: 0,
		satellites: 0,
		assetId: "4afd3d6e-0b0a-48fa-a7c7-9b987739c610",
    latitude: 38.73386,
    longitude: -9.14986
}}
];

var positionsCount = positions.length;
var currentPosition = 0;
var connected = false;
console.log(positionsCount);
/*
var secureServer = https.createServer({
    key: fs.readFileSync('./self-signed.key'),
    cert: fs.readFileSync('./self-signed.crt')
}, app);
*/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var io = socket.listen(http);
io.on('connection', function(socket){
    console.log('a user connected');
    connected = true;
    
    socket.on('disconnect', function(){
        connected = false
        console.log('user disconnected');
    });
        
    
});

(function() {
    if (connected) {
        if (currentPosition >= positions.length) {
            currentPosition = 0;
        }
        var position = positions[currentPosition];
        io.emit('position', position);
        console.log('sent '+ position);
        currentPosition++;    
    }
    setTimeout(arguments.callee, 10000);
})();

http.listen(3000, function(){
  console.log('listening on *:3000');
});
/*
secureServer.listen('443', () => {
    console.log('secure server started at 443');
})*/