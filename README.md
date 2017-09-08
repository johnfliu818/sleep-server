# sleep-server
Emulates a server that has variable response time.

Sometimes when I encounter a web server with slow response time, I would like to know whether the underlying database/resource server is slow, or there is an issue with my web server setup. This is especially true when dealing with Microsoft IIS + ASP.Net, which has issues dealing with too many threads with default configuration.

`sleep-server` acts as a dummy database/resource server, with a well defined response time, so you can determine the performance characteristic of your web server under load.


## Usage

Install with `npm install sleep-server -g`

Then type `sleep-server 3600` to start server on port 3600

Type `http://localhost:3600/sleep/1000` in browser to test it. (here 1000 tells sleep-server to delay for 1000ms before responding)


## Load testing with sleep-client

Now the server is running, we can test it using sleep-client, which came in the same package.

Open another terminal or command prompt, and type `sleep-client http://localhost:3600/sleep/5000`

It should run for about 15 seconds, periodically reporting back the average response time. An efficient server should have the average response time very close to 5000ms.
