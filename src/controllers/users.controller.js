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

module.exports = {
  me,
  updateMe
};