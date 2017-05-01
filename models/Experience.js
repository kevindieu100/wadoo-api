var bookshelf = require('./../bookshelf');
var Itinerary = require('./Itinerary');

var Experience = bookshelf.Model.extend({
  tableName: 'experiences',
  itinerary: function(){
    return this.belongsTo(Itinerary);
  },
});

module.exports = Experience;
