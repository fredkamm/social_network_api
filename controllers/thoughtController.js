const { User, Thought } = require("../models");

module.exports = {
    // getThoughts,
    getThoughts(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // getSingleThought,
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // createThought,
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'No User find with this ID!',
                    })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // updateThought,
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // deleteThought,
    deleteThought(req, res) {
        User.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : thought.findOneAndUpdate(
                        { _id: req.params.thoughtId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'no thought with this id!',
                    })
                    : res.json({ message: 'thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // addReaction,
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.reactionId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought find with this ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // deleteReaction
    deleteReaction(req, res) {
        Thought.findOneAndRemove({ _id: req.params.reactionId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : thought.findOneAndUpdate(
                        { _id: req.params.thoughtId },
                        { $pull: { reactions: { reactionId: req.params.reactionId } } },
                        { new: true }
                    )
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'no thought with this id!',
                    })
                    : res.json({ message: 'thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
}