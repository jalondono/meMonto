const mongoose = require('mongoose');
const {UserModel} = require('../models');
const {  } = require('../config');

function me(req, res){
  res.status(200).json({ data: req.user })
}

async function updateMe(req, res) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec();
    console.log(user.id);
    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
}

async function getOneById(req, res){
  const id =  req.params.id;
  try {
    const data = await UserModel.findById(id);
    return res.status(200).json(data)
  }
  catch(err) {
    res.status(400).json({
      message: "Error get one",
      data: id
    })
  }
}

async function getAll(req, res) {
  console.log('requester type ' + req.user.type);
  if (req.user.type !== 'super') {
    return res.status(400).send({message: 'Unauthorized user'})
  }
  try {
    const data = await UserModel.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      message: "Error"
    });
  }
}

async function getAllType(req, res){
  const type =  req.params.type;
  console.log('requested type ' + type);
  console.log('requester type '+ req.user.type);
  if (req.user.type !== 'super'){
    return res.status(400).send({ message: 'Unauthorized user' })
  }
        try {
      const data = await UserModel.find( { type: type });
      return res.status(200).json(data);
    } catch(err) {
          res.status(400).json({
            message: "Error"
          });
  }
}

async function removeOne(req, res){
  try {
    const removed = await UserModel.findOneAndRemove({
      _id: req.params.id
    });
    if (!removed) {
      return res.status(400).end()
    }
    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e);
    res.status(400).end()
  }
}

module.exports = {
  me,
  updateMe,
  getOneById,
  getAll,
  getAllType,
  removeOne
};