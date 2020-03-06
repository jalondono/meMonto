const express = require('express');
const router = express.Router();
const { UsersController} = require('../controllers');


router.get('/me', UsersController.me);

router.put('/update', UsersController.updateMe);


// /api/v1/user/signin
// POST: Creates a User and returns a token


// /api/v1/user/signup
// POST: Validates User and returns a token


/*
/api/v1/user/<user_id>
PUT: Updates a User object


/api/v1/user/all   **only Super
GET: Retrieves the list of all User objects.

/api/v1/user/driver/all **only Super
GET: Retrieves the list of all users of type Drivers objects.

/api/v1/user/admin/all **only Super
GET: Retrieves the list of all users of type Admins objects.

/api/v1/user/normal/all **only Super
GET: Retrieves the list of all users of type user objects.


/api/v1/users/<user_id>
GET: Returns the user's information based on its id.

/api/v1/users/<user_id> only self and Super
DELETE: Deletes a User object

*/



module.exports = router;