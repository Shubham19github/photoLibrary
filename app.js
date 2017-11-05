var express = require('express');
var path = require('path');
var consolidate = require('consolidate');
var bodyParser = require('body-parser');

var app = express();
var port = 4000;

var index = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.use('/', index);

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.engine('html',consolidate.swig)
app.set('view engine', 'html');

//application starts listening.
app.listen(port,function(){
	console.log('app listening on port '+ port);
});

module.exports = app;