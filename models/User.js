var bookshelf = require('./../bookshelf');
var Itinerary = require('./Itinerary');

var User = bookshelf.Model.extend({
  tableName: 'users',
  itineraries: function(){
    return this.hasMany(Itinerary);
  },
});

module.exports = User;
