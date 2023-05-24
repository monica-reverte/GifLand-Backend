const Gif = require("../models/gifModel");
const User = require("../models/userModel")
const { uploadImage, deleteImage  } = require('../utils/cloudinary');
const fs = require('fs-extra');


const getGif = async (req, res) => {

    try {
        const gifs = await Gif.find({ username: req.params.user})
        return res.status(200).json(gifs);
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        });
    }
}

const getGifId = async (req, res) => {
    console.log(req.body)
    try {
        const GifById = await Gif.findById(req.params.id)
        if (!GifById) return res.sendStatus(404)
        return res.json(GifById)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createGif = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
            if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    let gif = new Gif({
        username: userId
    });

    if (req.files?.file) {
        const result = await uploadImage(req.files.file.tempFilePath);
        console.log(result)
        gif.file = {
            url: result.secure_url,
            public_id: result.public_id
        };

        

        await fs.remove(req.files.file.tempFilePath);
    }

    await gif.save();
    
    return res.status(200).json({
        ok: true,
        gif});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updatingGifs = async (req, res) => {
    try {
  
      const updatedGif = await Gif.findByIdAndUpdate(req.body._id, {
        title: req.body.title }, { new: true }
      );
      console.log(updatedGif)
      return res.status(200).json({
        ok: true,
        updatedGif,
      });
     
    } catch (err) {
      console.error(err);
      return res.status(503).json({
        ok: false,
        message: 'Something happened',
      });
    }
  };
  
  const deletingGifs = async (req, res) => {

    try {
        const gifRemoved = await Gif.findByIdAndDelete(req.params.id)

        console.log(gifRemoved)

        if (!gifRemoved) return res.sendStatus(404)

        if (gifRemoved.file.public_id) await deleteImage(gifRemoved.file.public_id)
        return res.json({
            ok: true,
            message: "Gif Deleted Successfully"
        });
    } catch (err) {
        return res.status(503).json({
            ok: false,
            message: "Something happened"
        })
    }
}


module.exports = {createGif, getGif, updatingGifs, deletingGifs, getGifId}
