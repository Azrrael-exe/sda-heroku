var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
  name : {type : String, required: true},
  model : {type : String, required: true}
});

deviceSchema.statics.findDevice = function(req, res, next) {
  mongoose.model('Device').findOne({name : req.body.name || req.params.name}, function(err, device){
    if(err){
      next(err)
    }
    else {
      req.device = device
      next();
    }
  })
};

module.exports = mongoose.model('Device', deviceSchema);
