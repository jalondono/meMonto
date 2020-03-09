const express = require('express');
const router = express.Router();
const { BadgesController, BadgesStatsController} = require('../controllers');

///api/v1/badge/
// POST: Creates a Badge object
router.post('/', BadgesController.createOne);

// /api/v1/badge/<badge_id>
// /api/v1/badge/all
router.put('/:id', BadgesController.updateOne);
router.get('/all', BadgesController.getAll);
router.get('/:id', BadgesController.getOneById);

// /api/v1/badge/driver/<badge_id>
// GET: Retrieves the list of drivers associated with a Badge.
router.get('/driver/:badgeId', BadgesStatsController.getDrivers);

// /api/v1/badge/vehicle/<badge_id>
// GET: Retrieves the list of vehicles associated with a Badge.
router.get('/vehicle/:badgeId', BadgesStatsController.getVehicles);

// /api/v1/badge/admin/<badge_id>
// GET: Retrieves the list of admins associated with a Badge.
router.get('/admin/:badgeId', BadgesStatsController.getAdmins);

///api/v1/badge/vehicle/stats/average/<badge_id>
// GET: Retrieves the average of all Ratings objects of a Badge
router.get('/rating/stats/average/:badgeId', BadgesStatsController.getVehiclesRating);

///api/v1/badge/review/vehicle/stats/number/<badge_id>
// GET: Retrieves the number of all Reviews objects of a Badge
router.get('/review/stats/number/:badgeId', BadgesStatsController.getVehiclesReview);


module.exports = router;
