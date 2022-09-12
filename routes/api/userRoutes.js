const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// api/user GET all users and Create user
router.route('/').get(getUsers).post(createUser);

// api/user/:userId Get user by id, Edit and Delete by user id
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// /api/users/:userId/friends/:friendId Post and Delete a friend by ID
router.route('/userId/friends/:friendsId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router; 