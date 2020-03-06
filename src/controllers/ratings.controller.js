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


module.exports = {
    getOneById,
    getAllVehicle,
    getAllUser,
    createOne,
};