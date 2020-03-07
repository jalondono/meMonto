const mongoose = require('mongoose');
const { ReviewModel } = require('../models');

async function createOneReview(req, res) {
  const userId = req.user._id;
  try {
    req.body.userId = userId;
    console.log(userId);
    const created  = await ReviewModel.create(req.body);
    const saved = await created.save();
    return res.status(200).json(saved);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Error creating a Review"
    });
  }
}
 async  function getAllByVehicleId(req, res) {
   const vehicleId = req.params.vehicle_id;
   try {
     console.log(vehicleId);
     const reviews = await ReviewModel.find({vehicleId: vehicleId});
     return res.status(200).json(reviews);
   } catch (err) {
     res.status(400).json({
       message: "Error Get All Reviews by Vehicle Id",
     });
   }
 }

  async function getNumberOfReviews(req, res) {
    const vehicleId = req.params.vehicle_id;
    let count = 0;
    try {
      const reviews = await ReviewModel.find({vehicleId: vehicleId});
      count = reviews.length;
      return res.status(200).json({numberOfReviews: count});
    }
    catch (err) {
      res.status(400).json({
        message: "Error Get Number of Reviews",
      });
    }
  }

async function getAllByUserId(req, res) {
  const userId = req.params.user_id;
  try {
    console.log(userId);
    const reviews = await ReviewModel.find({userId: userId});
    return res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({
      message: "Error Get All Reviews by User Id",
    });
  }
}

async function getReviewById(req, res) {
  const reviewId = req.params.review_id;
  try {
    console.log(reviewId);
    const reviews = await ReviewModel.findById(reviewId);
    return res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json({
      message: "Error Get Reviews by Id",
    });
  }
}

module.exports = {
  createOneReview,
  getAllByVehicleId,
  getNumberOfReviews,
  getAllByUserId,
  getReviewById,
};