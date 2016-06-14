var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());

var port = 3000;

app.post('/api/sighting', function(req, res) {
  console.log('POST sighting');
  res.end();
});
 
app.get('/api/sighting', function(req, res) {
  console.log('GET sighting');
  res.end();
});
 
app.delete('/api/sighting', function(req, res) {
  console.log('DELETE sighting');
  res.end();
});
 
app.put('/api/sighting', function(req, res) {
  console.log('PUT sighting');
  res.end();
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
