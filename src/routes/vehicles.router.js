const express = require('express');
const router = express.Router();
const { VehiclesController} = require('../controllers');


///api/v1/vehicle/
// POST: Creates a Vehicle object
router.post('/', VehiclesController.createOne);

// /api/v1/vehicle/<vehicle_id>
// PUT: Updates a Vehicle object
router.put('/:id',VehiclesController.updateOne);

// /api/v1/vehicle/all
// GET: Retrieves all vehicle objects
router.get('/all', VehiclesController.getAll);

// api/v1/vehicle/<vehicle_id>
// GET: Retrieves a vehicle object
router.get('/:id', VehiclesController.getOneById);

// api/v1/vehicle/plate/<plate>
// GET: Retrieves a vehicle object by plate
router.get('/plate/:plate', VehiclesController.getOneByPlate);

module.exports = router;