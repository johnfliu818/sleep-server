# sleep-server
Emulates a server that has variable response time.

Sometimes when I encounter a web server with slow response time, I would like to know whether the underlying database/resource server is slow, or there is an issue with my web server setup. This is especially true when dealing with Microsoft IIS + ASP.Net, which has issues dealing with too many threads with default configuration.

`sleep-server` acts as a dummy database/resource server, with a well defined response time, so you can determine the performance characteristic of your web server under load.


## Install

`npm install sleep-server`

then create a index.js file like below:

    var sleepserver = require('sleep-server')

    let port = 3600

    sleepserver.start(port, function() {
        console.log("listening on http://localhost:%s", port)
    })

then `node index.js`


## Using sleep-server

Open a browser, and type `http://localhost:3600/sleep/3000` in the URL.

It should wait 3 seconds, then return a result like this:
`{"success":true,"url":"/sleep/3000","timeout":3000}`

The number `3000` in `/sleep/3000` tells the server to sleep 3000ms before it responds. This emulates a database/resource server that needs time to process data before responding.