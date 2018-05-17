var express = require('express');
var router = express.Router();
var device = require('../models/devices')

router.get('/', function(req, res, next){
  device.find({}).then(function(err, data){
    if(err){
      res.send(err);
    }
    res.send(data);
  })
})

router.post('/', device.findDevice, function (req, res, next) {
  if(req.device){
    res.send({
      message : "Device already in DB"
    })
  }
  else {
    var newDevice = new device();
    newDevice['name'] = req.body.name
    newDevice['model'] = req.body.model
    newDevice.save().then(function(err, data){
      if(err){
        res.send(err)
      }
      else {
        res.send({
          message : "Device created!"
        })
      }
    })
  }
})

router.get('/:name', device.findDevice, function(req, res, next){
  if(req.device){
    res.send({
      payload : req.device
    })
  }
  else {
    res.send({
      message : "Device not found!"
    })
  }
})

router.delete('/:name', device.findDevice, function(req, res, next){
  if(req.device){
    req.device.remove(function(err){
      res.send({
        message : "Device removed",
        payload : req.device
      })
    })
  }
  else {
    res.send({
      message : "Device not found!"
    })
  }
})

module.exports = router
