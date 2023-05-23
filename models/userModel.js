const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    name: { type: String },

    email: { type: String },

});

module.exports = model("User", userSchema);