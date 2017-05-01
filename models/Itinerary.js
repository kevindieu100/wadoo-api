var bookshelf = require('./../bookshelf');
var Experience = require('./Experience');

var Itinerary = bookshelf.Model.extend({
  tableName: 'itineraries',
  experiences: function(){
    return this.hasMany(Experience);
  },
});

module.exports = Itinerary;
