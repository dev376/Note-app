const express = require('express');
const Note = require('../models/notes');
const router = express.Router();


router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  let note = await new Note({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    note = await note.save();
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.render('new');
  }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params.id;
    try {
        Note.findByIdAndDelete({ id });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;