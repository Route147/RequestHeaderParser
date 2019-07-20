// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get('/api/whoami', function(request, response, next){
	// request.ip
  let forwardip = request.headers['x-forwarded-for'].split(',');
  request.ipaddress = forwardip[0];
//x  request.ipaddress = request.connection.remoteAddress;
  request.lang = request.headers['accept-language'];
  request.software = request.headers['user-agent'];
  next();
}, function(request, response){
  response.json({"ipaddress":request.ipaddress,"language":request.lang,
"software":request.software});  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
