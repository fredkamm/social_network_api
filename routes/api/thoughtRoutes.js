const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// api/thoughts GET all users and Create user
router.route('/').get(getThoughts).post(createThought);

// api/user/:thoughtId Get user by id, Edit and Delete by user id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// /api/thought/:thoughtId/reactions/:reactionId Post and Delete a friend by ID
router.route('/userId/friends/:friendsId')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router; 