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

// api/thoughts GET all thoughts and Create thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thought/:thoughtId Get user by id, Edit and Delete by thought id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

// /api/thought/:thoughtId/reactions Post a reaction 
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thought/:thoughtId/reactions/:reactionId Post a reaction 
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router; 