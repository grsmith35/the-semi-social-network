const { User } = require('../models');

const friendController = {
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'No user found with this ID'});
                return;
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: {friends: params.friendId }},
            { new: true }
        )
        .then(friendData => {
            if(!friendData) {
                res.status(404).json({ message: 'No user found with this id!'});
            }
            res.json(friendData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = friendController;