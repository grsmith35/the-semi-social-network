const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err))
    },

    //get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId})
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({message: 'No thought found with this ID'})
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //create a thought for a user id
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            )
        })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.status(400).json(err));
    },

    //create a thought reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true}
        )
        .then(reactionData => {
            if(!reactionData) {
                res.statut(404).json({message: 'No thought with this ID found.'});
                return;
            }
            res.json(reactionData);
        })
        .catch(err => res.status(400).json(err));
    },

    //update a thought
    updateThought({ params, body }, res) {
        console.log('got to the update')
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            body,
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID'});
                return;
            }
            console.log(thoughtData);
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(thoughtData => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought with this ID found' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a thought reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionId: params.reactionId}}},
            { new: true }
        )
        .then(reactionData => {
            if(!reactionData) {
                res.status(404).json({ message: 'No reaction with this ID found!'});
            }
            console.log('there was data ')
            res.json(reactionData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
        
    }
};

module.exports = thoughtController;