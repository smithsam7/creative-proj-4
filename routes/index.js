var express = require('express');
const fs = require('fs');
const https = require('https');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'public'});
});

router.get('/owl', function(req, res, next) {
    var url = "https://api.openuv.io/api/v1/uv?lat=" + lat + '&lng=' + lng + '&alt=' + alt + "/";
    console.log(url);
    url += req.query['q'];
    url += "?format=json";
    request(url).pipe(res);
});

module.exports = router;