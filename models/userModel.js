const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    name: { type: String },

    email: { type: String },

    picture: {
        type: String,
        required: true,
        public_id: { type: String, required: false, default: "" },
        default: "https://res.cloudinary.com/dycz1nib9/image/upload/v1684941436/Gifs/k%C3%A9k%C3%A9crossing-pac-man_ezogni.gif"
      },

});

module.exports = model("User", userSchema);