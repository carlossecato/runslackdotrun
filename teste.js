var http = require("http");

http.createServer(function(req, res) {
  res.writeHead(301,{Location: 'https://carlossecato.github.io/runslackdotrun/'});
  res.end();
}).listen(8888);