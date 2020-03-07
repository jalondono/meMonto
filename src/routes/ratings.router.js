const express = require('express');
const router = express.Router();
const { RatingsController} = require('../controllers');


///api/v1/rating/
// POST: Creates a Rating object
router.post('/', RatingsController.createOne);

// /api/v1/rating/vehicle/:vehicleId
// GET: Retrieves all rating objects for a vehicle
router.get('/vehicle/:vehicleId', RatingsController.getAllVehicle);

router.get('/user/:userId', RatingsController.getAllUser);

// api/v1/rating/<rating_id>
// GET: Retrieves a rating object
router.get('/:id', RatingsController.getOneById);


// /api/v1/rating//vehicle/stats/average/<vehicle_id>
// GET: Retrieves the average of all Ratings objects of a Vehicle
router.get('/vehicle/average/:vehicleId', RatingsController.getAvgRating);

module.exports = router;