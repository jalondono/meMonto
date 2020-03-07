const express = require('express');
const router = express.Router();
const { ReviewController} = require('../controllers');


// /api/v1/review/vehicle/<vehicle_id>/
// POST: Creates a Review
router.post('/vehicle', ReviewController.createOneReview);

// /api/v1/review/all/vehicle/<vehicle_id>/
// GET: Retrieves the list of all Review objects of a Vehicle
router.get('/all/vehicle/:vehicle_id', ReviewController.getAllByVehicleId);

// /api/v1/review//vehicle/stats/number/<vehicle_id>
// GET: Retrieves the number of all Reviews of a Vehicle
router.get('/vehicle/stats/number/:vehicle_id', ReviewController.getNumberOfReviews);

// api/v1/review/all/user/<user_id>
// GET: Retrieves the list of all Review objects of a user by user id
router.get('/all/user/:user_id', ReviewController.getAllByUserId);

// /api/v1/review/<review_id>
// GET: Retrieves a Review object.
router.get('/:review_id', ReviewController.getReviewById);

// /api/v1/reviews/<review_id>
// DELETE: Deletes a Review object
router.delete('/:review_id');





module.exports = router;