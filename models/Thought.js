const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 28,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format('MMM DD, YYYY hh:mm'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ reactionSchema ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeStamp => moment(timeStamp).format('MMM DD, YYYY hh:mm'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// Create a virtual property `reactionCount` that gets the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Initialize the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;