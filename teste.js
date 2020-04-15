
var WebSocketServer = require("ws").Server;
var http = require("http");
var express = require("express");
var app = express();
var path = require('path')
var port = process.env.PORT || 5000;
var flash = require('connect-flash');
var passport = require("passport");
var request = require('request');
var session = require("express-session");
var bodyParser = require('body-parser');
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(flash());
app.use(session({secret: 'keyboard cat'}))
app.use(bodyParser());
app.set('view engine', 'pug');
app.set('view options', { layout: false });
require('./lib/routes.js')(app);
var path = require('path');
var updater = require( path.resolve( __dirname, "./db.js" ) );
updater('/join');


app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")


app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/auth.html')
});


wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)


  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})