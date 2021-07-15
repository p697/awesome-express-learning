"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = require("./controllers");
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use('/hfut/login', controllers_1.LoginController);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
