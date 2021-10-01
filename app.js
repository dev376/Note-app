const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Note = require('./models/notes');
const notesRouter = require('./routes/routes');
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true, limit : '30mb' }));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  const notes = await Note.find().sort('-createdAt');
  res.render('index', { notes: notes });
});

mongoose.connect('mongodb+srv://hellboy:Rssg1234@cluster0.ygkwq.mongodb.net/note-app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, console.log('db connected'));

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started on port 3000`);
});