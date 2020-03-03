const express = require('express');
const router = express.Router();
const { VehiclesController} = require('../controllers');

//methods without params
router.get('/', VehiclesController.getAll);
router.post('/', VehiclesController.createOne);

//methods with params
router.get('/:id', VehiclesController.getOneById);
router.put('/:id',VehiclesController.updateOne);
router.delete('/:id',VehiclesController.deleteOne);
router.get('/plate/:license_plate', VehiclesController.getOneByPlate);

module.exports = router;