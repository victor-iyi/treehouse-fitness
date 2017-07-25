const path = require('path');
const express = require('express');
const posts = require('./mock/post.json');

const app = express();

// set template engine
app.set('view engine', 'jade');
app.set('views', `${__dirname}/templates`);

// staic middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/blog/:title', (req, res) => {
  const title = req.params.title;
  if ( !title ) {
    res.status(503);
    res.send('Bad Request!');
  } else {
    const post = posts[title] || {};
    console.log(post);
    res.render('post', { post });
  }
});

// Starting up the server
app.listen(3000, () => console.log('Frontend server listening on https://localhost:3000') );