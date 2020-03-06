const mongoose = require('mongoose');
const {VehicleModel} = require('../models');

async function getOneById(req, res){
    const id =  req.params.id;
    try {
        const data = await VehicleModel.findById(id);
        return res.status(200).json(data)  
    }
    catch(err) {
        res.status(400).json({
            message: "Error get one",
            data: id
        })
    } 
}
async function getOneByPlate(req, res){
    const plate =  req.params.plate;
    try {
        const data = await VehicleModel.findOne({plate: plate});
        return res.status(200).json(data)  
    }
    catch(err) {
        res.status(400).json({
            message: "Error get one",
            data: plate
        })
    } 
}
async function getAll(req, res){
    try {
        const data = await VehicleModel.find();
        return res.status(200).json(data);
    }
    catch(err) {
        res.status(400).json({
            message: "Error"
        });
    }
}
async function createOne(req, res) {
    try {
        const newData = await new VehicleModel(req.body);
        const saveData = await newData.save();
        res.status(200).json(saveData);
    }
    catch(err) {
        res.status(400).json({
            message: "Error Creating a Vehicle"
        });
    }
}
async function updateOne(req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const update = await VehicleModel
          .findOneAndUpdate({
                _id: id
            },
            req.body,
            {new: true})
          .lean()
          .exec();

        if (!update){
            return res.status(400).end()
        }

         res.status(200).json({ data: update })
    } catch(err) {
        res.status(400).json({
            message: "Error Update"
        })
    }
}

module.exports = {
    getOneById,
    getOneByPlate,
    getAll,
    createOne,
    updateOne,
};