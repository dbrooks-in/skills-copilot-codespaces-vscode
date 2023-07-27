// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Load the database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json'); // FileSync is a class
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ comments: [] }).write(); // Create a 'comments' table

// Set up the template engine
app.set('view engine', 'ejs');

// Set up the static assets
app.use(express.static('public'));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Render the index page
app.get('/', (req, res) => {
  res.render('index');
});

// Render the comments page
app.get('/comments', (req, res) => {
  res.render('comments', { comments: db.get('comments').value() });
});

// Create a new comment
app.post('/comments', (req, res) => {
  db.get('comments').push(req.body).write();
  res.redirect('/comments');
});

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));