"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./utils/server");
server_1.createServer()
    .then(function (server) {
    server.listen(3000, function () {
        console.info("Listening on http://localhost:3000");
    });
})
    .catch(function (err) {
    console.error("Error: " + err);
});
