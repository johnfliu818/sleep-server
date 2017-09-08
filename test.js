var sleepserver = require('./index.js')

let port = 3600

sleepserver.start(port, function() {
    console.log("listening on http://localhost:%s", port)
})