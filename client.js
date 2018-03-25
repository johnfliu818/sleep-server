#!/usr/bin/env node

var http = require('http');

if (process.argv.length < 3) {
  console.log('usage: sleep-client <url> [delay in ms] [duration in seconds]');
  console.log('e.g. : sleep-client http://localhost:3600/sleep/5000');
} else {
  var url = process.argv[2];
  var delay = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  var duration = process.argv.length > 4 ? parseInt(process.argv[4]) : 10;
  var repeats = Math.floor(duration * 1000 / delay);

  var times = [];
  var totaltime = 0;
  var totalRequests = 0;
  var totalReturns = 0;

  function request() { // eslint-disable-line
    if (totalRequests >= repeats) return null;
    totalRequests += 1;
    if (totalRequests < repeats) setTimeout(request, delay);

    var starttime = new Date();
    function callback(response) { // eslint-disable-line
      // console.log('got something')
      totalReturns += 1;

      var endtime = new Date();
      var responsetime = (endtime - starttime);
      times.push(responsetime);
      totaltime += responsetime;

      if (totalReturns % 100 === 0) {
        console.log('average time = ' + (totaltime / totalReturns) + 'ms');
      }
      // only show final stats if more than 20 repeats (so we get enough data points, and also the percentiles indexer might be wrong otherwise)
      // show stats when done
      if (totalReturns >= repeats && repeats >= 20) {
        times.sort();
        console.log('-----------------');
        console.log('max: ' + times[totalReturns-1] + 'ms');
        console.log('90%: ' + times[Math.ceil(totalReturns * 0.9)-1] + 'ms');
        console.log('75%: ' + times[Math.ceil(totalReturns * 0.75)-1] + 'ms');
        console.log('min: ' + times[0] + 'ms');
      }
    }

    http.request(url, callback).end();
  }

  request();
}
