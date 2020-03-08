const { BadgeModel } = require('../models');
const { UserModel } = require('../models');
const { VehicleModel } = require('../models');
const { RatingModel } = require('../models');
const { ReviewModel } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

async function getDrivers(req, res) {
  const badgeId =  req.params.badgeId;
  console.log('Fetching badge given by badgeId: ' + badgeId);
  try {
    const badgeData = await BadgeModel.findById(badgeId);
    console.log(badgeData.drivers);
    let list = [];
    for (const element of badgeData.drivers) {
      list.push(await UserModel.findById(element));
    }
    return res.status(200).json(list);
  }
  catch(err) {
    res.status(400).json({
      message: "Error getting drivers"
    });
  }
}

async function getVehicles(req, res) {
  const badgeId =  req.params.badgeId;
  console.log('Fetching badge given by badgeId: ' + badgeId);
  try {
    const badgeData = await BadgeModel.findById(badgeId);
    console.log(badgeData.vehicles);
    let list = [];
    for (const element of badgeData.vehicles) {
      console.log(element);
      list.push(await VehicleModel.findById(element));
    }
    return res.status(200).json(list);
  }
  catch(err) {
    res.status(400).json({
      message: "Error getting vehicles"
    });
  }
}

async function getAdmins(req, res) {
  const badgeId =  req.params.badgeId;
  console.log('Fetching badge given by badgeId: ' + badgeId);
  try {
    const badgeData = await BadgeModel.findById(badgeId);
    console.log(badgeData.admins);
    console.log(badgeData.admins[0]);
    let list = [];
    for (const element of badgeData.admins) {
      list.push(await UserModel.findById(element));
    }
       return res.status(200).json(list);
  }
  catch(err) {
    res.status(400).json({
      message: "Error getting admins"
    });
  }
}

async function getVehiclesRating(req, res) {
  const badgeId =  req.params.badgeId;
  console.log('Fetching badge given by badgeId: ' + badgeId);
  try {
    const badgeData = await BadgeModel.findById(badgeId);
    console.log(badgeData.vehicles);
    let list = [];
    for (const element of badgeData.vehicles) {
      const vehicleId =  element;
      const myDate = new Date();
      myDate.setDate(myDate.getDate()-30);
      console.log('Fetching average ratings for vehicleId: ' + vehicleId);
      try {
        const data = await RatingModel.find(
          { createdAt: {'$gt': myDate },
            vehicleId: vehicleId }
        );
        const myList = data.map(a => a.value);
        const vehicleAvg = myList.reduce((a,b) => a + b, 0) / myList.length;
        console.log("vehicleAvg: " + vehicleAvg);
        list.push(vehicleAvg);
      }
      catch(err) {
        console.log(err);
        res.status(400).json({
          message: "Error getting average ratings"
        });
    }
    }
    const badgeAvg = list.reduce((a,b) => a + b, 0) / list.length;
    console.log("badgeAvg: " + badgeAvg);
    return res.status(200).json({"ratingAvg": badgeAvg } );
  }
  catch(err) {
    res.status(400).json({
      message: "Error getting vehicles"
    });
  }
}

async function getVehiclesReview(req, res) {
  const badgeId =  req.params.badgeId;
  console.log('Fetching badge given by badgeId: ' + badgeId);
  try {
    const badgeData = await BadgeModel.findById(badgeId);
    console.log(badgeData.vehicles);
    let list = [];
    for (const element of badgeData.vehicles) {
      const vehicleId =  element;
      const myDate = new Date();
      myDate.setDate(myDate.getDate()-30);
      console.log('Fetching average ratings for vehicleId: ' + vehicleId);
      try {
        const data = await ReviewModel.find(
          { createdAt: {'$gt': myDate },
            vehicleId: vehicleId }
        );
        const myList = data.map(a => a);
        const vehicleNum = myList.length;
        console.log("vehicleNum: " + vehicleNum);
        list.push(vehicleNum);
      }
      catch(err) {
        console.log(err);
        res.status(400).json({
          message: "Error getting average ratings"
        });
      }
    }
    const badgeNum = list.reduce((a,b) => a + b, 0);
    console.log("badgeNum: " + badgeNum);
    return res.status(200).json({"reviewNum": badgeNum });
  }
  catch(err) {
    res.status(400).json({
      message: "Error getting vehicles"
    });
  }
}

module.exports = {
  getDrivers,
  getVehicles,
  getAdmins,
  getVehiclesRating,
  getVehiclesReview

};
