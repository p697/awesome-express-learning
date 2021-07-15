"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var express_1 = require("express");
var router = express_1.Router();
/**
 * 合工大2021新版门户CAS统一验证
 */
router.get('/cas', function (req, res) {
    var name = req.params.name;
    res.send('你, World!' + name);
});
exports.LoginController = router;
