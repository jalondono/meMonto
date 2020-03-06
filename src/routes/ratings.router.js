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


module.exports = router;