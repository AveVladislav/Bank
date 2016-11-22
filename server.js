
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;  
var bank = [];
var bankexx = []; 
var bankNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){  
	res.send('Open deposit in our bank!');   
}); 

// GET /bank
app.get('/bank', function(req, res){
	res.json(bank);
});

// GET /bank/:id 
app.get('/bank/:id', function(req, res){    
	var bankId = parseInt(req.params.id, 10);
	var matchedBank = _.findWhere(bankexx, {id: bankId});  

	if(matchedBank){ 
		res.json(matchedBank);
	}else{ 
		res.status(404).send();
	}



});

// POST /bank

app.post('/bank', function(req, res){        
	var body = _.pick(req.body, 'name_client', 'money', 'сurrency', 'percent_for_year', 'period_day');             
 
	if(!_.isString(body.name_client) || body.name_client.trim().length === 0  

		|| body.money.length===0 || !_.isNumber(body.money) || body.percent_for_year.length===0 || !_.isNumber(body.percent_for_year) || !_.isNumber(body.period_day) || body.period_day.length===0){        
		 
		return res.status(400).send();  
	}

	body.name_client = body.name_client.trim();            
	body.id = bankNextId++;
 
	bank.push(body.name_client + ', your id is ' + body.id + ' and potencial sum on account after ' + body.period_day + ' days = ' 
		+ (Math.round(body.money+body.money*body.percent_for_year*body.period_day/365/100)));         
 
	bankexx.push(body); 

	res.json(body.name_client + ', your id is ' + body.id + ' and potencial sum on account after ' + body.period_day + ' days = ' 
		+ (Math.round(body.money+body.money*body.percent_for_year*body.period_day/365/100)));    
		
});


//Delete 
app.delete('/bank/:id', function(req,res){    
	var bankId = parseInt(req.params.id,10); 
	var matchedBank = _.findWhere(bankexx, {id: bankId});  

	if(!matchedBank){  
		res.status(404).json({"error": "no account found with that id"});   
	}else{
		bankexx = _.without(bankexx, matchedBank); 
		res.json(matchedBank);
	}
});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!'); 
});
