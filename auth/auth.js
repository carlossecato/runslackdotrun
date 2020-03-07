var http = require("http");
var express = require("express");
var app = express();
const router = express.Router();

router.get('/', (req,res) =>{
	res.json({
		message: 'Hello World'
	});
});

module.exports = router;