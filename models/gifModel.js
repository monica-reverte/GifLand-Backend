
const { Schema, model } = require("mongoose");

const gifSchema = new Schema({

    title: {
        type: String,
        required: false,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    file: {
        url: String,
        public_id: String
    },

});

module.exports = model("Gif", gifSchema);
