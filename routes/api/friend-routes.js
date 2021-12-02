const router = require('express').Router();

const {
    addFriend,
    removeFriend
} = require('../../controllers/friends-controller');

router
    .route('/')
    .post(addFriend)

router
    .route('/:friendId')
    .delete(removeFriend)

module.exports = router;