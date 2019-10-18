var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var redis = require('redis');


var app = express();
var client = redis.createClient();

client.on('connect', function(){
     console.log('Redis server Connected');
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.set(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
    var title ='task list';
    client.lrange('tasks', 0, -1, function(err, reply){
        res.render('index',{
            title: title,
            tasks: reply
        });
    });
   
});

app.listen(3000);
console.log('server started on port 3000');

module.exports = app;