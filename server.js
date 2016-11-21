var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;

app.get('/', function(req, res){
	res.send('Bank. Main page'); 
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
});
