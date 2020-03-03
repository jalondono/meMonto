const mongoose = require('mongoose')
const {VehicleModel} = require('../models')

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
};
async function getOneByPlate(req, res){
    const plate =  req.params.license_plate;
    try {
        const data = await VehicleModel.findOne({license_plate: plate});
        return res.status(200).json(data)  
    }
    catch(err) {
        res.status(400).json({
            message: "Error get one",
            data: id
        })
    } 
};
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
};
async function createOne(req, res) {
    try {
        const newData = await new VehicleModel(req.body);
        const saveData = await newData.save();
        res.status(200).json(saveData);
    }
    catch(err) {
        res.status(400).json({
            message: "Error"
        });
    }
}
async function updateOne(req, res) {
    const id = req.params.id
    const data = req.body;
    try {
        const update = await VehicleModel.update({_id: id}, {license_plate: data.license_plate});
        return res.status(200).json({
            message: "Updated successful"
        });
    }
    catch(err) {
        res.status(400).json({
            message: "Error Update"
        })
    }
}

async function deleteOne(req, res) {

}

module.exports = {
    getOneById,
    getOneByPlate,
    getAll,
    createOne,
    updateOne,
    deleteOne,
};