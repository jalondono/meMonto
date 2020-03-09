const express = require('express');
const router = express.Router();
const { BadgesController} = require('../controllers');


/*
router.get('/me', UsersController.me);
router.put('/update', UsersController.updateMe);
*/

///api/v1/badge/
// POST: Creates a Badge object
router.post('/', BadgesController.createOne);

// /api/v1/badge/<badge_id>
// /api/v1/badge/all
router.put('/:id', BadgesController.updateOne);
router.get('/all', BadgesController.getAll);
router.get('/:id', BadgesController.getOneById);

// /api/v1/user/all   **only Super
// GET: Retrieves the list of all User objects.
// router.get('/all', UsersController.getAll);
//router.get('/all', BadgesController.getAll);

// /api/v1/user/all/<type> **only Super
// GET: Retrieves the list of all users of given type (no type all users).
//router.get('/all/:type', BadgesController.getAllType);

// /api/v1/user/admin/all **only Super
//GET: Retrieves the list of all users of type Admins objects.

// /api/v1/user/normal/all **only Super
//GET: Retrieves the list of all users of type user objects.


// /api/v1/users/<user_id>
// GET: Returns the user's information based on its id.
//router.get('/:id', BadgesController.getOneById);

// /api/v1/users/<user_id> only self and Super
// DELETE: Deletes a User object
//router.delete('/:id', BadgesController.removeOne);


module.exports = router;
