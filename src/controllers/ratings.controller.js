const mongoose = require('mongoose');
const {RatingModel} = require('../models');

async function getOneById(req, res){
    const id =  req.params.id;
    try {
        const data = await RatingModel.findById(id);
        return res.status(200).json(data)  
    }
    catch(err) {
        res.status(400).json({
            message: "Error get one",
            data: id
        })
    } 
}

async function getAllVehicle(req, res){
    const vehicleId =  req.params.vehicleId;
    console.log('Fetching ratings for vehicleId: ' + vehicleId);
    try {
        const data = await RatingModel.find({ vehicleId: vehicleId });
        console.log(data);
        return res.status(200).json(data);
    }
    catch(err) {
        res.status(400).json({
            message: "Error getting ratings"
        });
    }
}

async function getAllUser(req, res) {
    if (req.user.type !== 'super') {
        return res.status(400).send({message: 'Unauthorized user'})
    }
    const userId =  req.params.userId;
    console.log('Fetching ratings given by userId: ' + userId);
    try {
        const data = await RatingModel.find({ userId: userId });
        console.log(data);
        return res.status(200).json(data);
    }
    catch(err) {
        res.status(400).json({
            message: "Error getting ratings"
        });
    }
}

async function createOne(req, res) {
    const createdBy = req.user._id
    try {
        const doc = await RatingModel.create({ ...req.body, "userId": createdBy });
        res.status(201).json({ data: doc })
    } catch (e) {
        console.error(e);
        res.status(400).end()
        message: "Error Creating a Rating"
    }
}

async function getAvgRating(req, res) {
    const vehicleId =  req.params.vehicleId;
    const myDate = new Date();
    myDate.setDate(myDate.getDate()-30);
    console.log('Fetching average ratings for vehicleId: ' + vehicleId);
    try {
        const data = await RatingModel.find(
          { createdAt: {'$gt': myDate },
           vehicleId: vehicleId }
          );
        const myList = data.map(a => a.value);
        const avg = myList.reduce((a,b) => a + b, 0) / myList.length;
        console.log(avg);
        const myJson = {'Average': avg};
        return res.status(200).json(myJson);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({
            message: "Error getting average ratings"
        });
    }
}


module.exports = {
    getOneById,
    getAllVehicle,
    getAllUser,
    createOne,
    getAvgRating
};