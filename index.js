require('dotenv').config();
var express = require('express');
var app = express();
var Itinerary = require('./models/Itinerary');
var Experience = require('./models/Experience');
var User = require('./models/User')
var bodyParser = require('body-parser');
var cors = require('cors');

//middleware
app.use(bodyParser.json()); //parse requst with application/json
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//returns a list of all the itineraries
app.get('/api/v1/itineraries', function(request, response){
  Itinerary.fetchAll({withRelated:['experiences']}).then(function(itineraries){
    response.json(itineraries);
  });
});

//returns a signle itinerary object with that id
app.get('/api/v1/itineraries/:id', function(request, response){
  Itinerary
    .where('id', request.params.id)
    .fetch({
      require: true,
      withRelated: ['experiences']
    })
    .then(function(itinerary){
      response.json(itinerary);
    }, function(){
      response.status(404).json({
        error: 'Itinerary cannot be found!'
      })
    });
});

//returns a list of all the users
app.get('/api/v1/users', function(request, response){
  User.fetchAll({withRelated:['itineraries']}).then(function(users){
    response.json(users);
  });
});

//creates a new user
app.post('/api/v1/users', function(request, response){
  var user = new User({
      first_name: request.body.first_name,
      last_name: request.body.last_name,
      email: request.body.email,
      password: request.body.password
  });

  user.save().then(function(){
    response.json(user);
  }, function(){
    response.status(404).json({
      error: 'User could not be created!'
    })
  });
});

//deletes a user with given id
app.delete('/api/v1/users/:id', function(request, response){
  var user = new User({
    id: request.params.id
  });
  user
    .destroy({require:true})
    .then(function(){
      response.json({
        success: "Successfully deleted user!"
      })
    }, function(){
      response.status(404).json({
        error: 'User could not found! Please provide a valid user id in order to delete a user!'
      });
    });
});


app.listen(process.env.PORT || 3000);
