var http = require('http')

function start(port, callback) {
    function handleRequest(req, resp) {
        // console.log(req.url)
        if (req.url != null && req.url.startsWith('/sleep/')) {
            var timeout = parseInt(req.url.substring(7))
            setTimeout(function() {
                resp.end(JSON.stringify({
                    success: true,
                    url: req.url,
                    timeout: timeout
                }))
            }, timeout)
        } else {
            resp.statusCode = 404
            resp.end(JSON.stringify({success: false}))
        }
    }

    var server = http.createServer(handleRequest)
    server.listen(port, callback)
}

exports.start = start