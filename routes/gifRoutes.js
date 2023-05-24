const express = require('express');
const { createGif, getGif, updatingGifs,deletingGifs, getGifId } = require("../controllers/gifController");

const router = express.Router();

router.get('/getgif/:user', getGif)
router.post('/create', createGif )
router.put('/edit', updatingGifs)
router.delete('/delete/:id', deletingGifs)
router.get("/:id", getGifId)


module.exports = router;

