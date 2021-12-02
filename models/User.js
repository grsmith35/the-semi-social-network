const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    thoughts: [
        {
           type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

//virtual to get friend count
UserSchema.virtual('friendcount').get(function() {
    return this.friends.length;
})
const User = model('User', UserSchema);

module.exports = User;