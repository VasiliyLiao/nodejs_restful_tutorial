const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var card = new Schema({
  name: {
    type: String,
    default: ''
  }
});

card.statics.findOneById = function(id, cb) {
  this.findOne({
    _id: id
  }, cb);
};

card.statics.createWithName = function(name, cb) {
  this.create({
    name: name
  }, cb);
};

card.statics.removeById = function(id, cb) {
  this.remove({
    _id: id
  }, cb);
};

card.statics.updateWithNameById = function(id, name, cb) {
  this.update({
    _id: id
  }, {
    name: name
  }, cb);
};

mongoose.model('Card', card);
