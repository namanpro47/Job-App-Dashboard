var express = require('express');
var router = express.Router();

var fs = require('fs');
var role = "software+engineer+intern"

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Company: ' + data + ', Link: ' +
  'https://www.google.com/search?q=' + data + '+' + role + '&ibp=htl;jobs');
}

var path = require('path');
var input = fs.createReadStream(path.join(__dirname, '../text/companies.txt'));
readLines(input, func);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(input);
});

module.exports = router;
