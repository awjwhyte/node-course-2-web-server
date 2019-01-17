const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method}: ${req.url}`
  console.log(log);

  next();
  fs.appendFile('server.log', log + '\n', (error) => {
    if (error) {
      console.log('\nUnable to create server log')
    }
  });
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  // res.send('\n<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website!',
    lang: 'Node JS'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to get Data'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.listen(5000, () => {
  console.log('Server is up and running on port 5000.');
});
