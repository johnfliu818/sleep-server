#!/usr/bin/env 

var http = require('http')

if (process.argv.length < 3) {
    console.log("usage: sleep-client <url> [delay] [duration]")
} else {
    var url = process.argv[2]
    var delay = process.argv.length > 3 ? parseInt(process.argv[3]) : 10
    var duration = process.argv.length > 4 ? parseInt(process.argv[4]) : 10
    var repeats = Math.floor(duration * 1000 / delay)

    var max = 0
    var min = 0
    var totaltime = 0
    var totalRequests = 0
    var totalReturns = 0

    function request() {
        if (totalRequests >= repeats) return null
        totalRequests += 1
        if (totalRequests < repeats) setTimeout(request, delay)

        var starttime = new Date()
        function callback(response) {
            // console.log('got something')
            totalReturns += 1

            var endtime = new Date()
            totaltime += (endtime - starttime)

            if (totalReturns % 100 === 0) {
                console.log("average time = " + (totaltime / totalReturns) + "ms")
            }

        }

        http.request(url, callback).end()
    }

    request()
}