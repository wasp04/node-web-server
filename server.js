const express = require('express');
const fs=require('fs');
var app = express();
var hbs= require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

//app.use((req,res,next)=>{
   res.render('maintainence.hbs',{
     Title: 'OOPS!',
     Body: 'The site is Currently under maintainence!'
   })
  });
// GO TO &&&& Comment
app.use(express.static(__dirname + '/public'));
// TO set up a handler for http request.

app.use((req,res,next) => {
var now=new Date().toString();
var log = `${now}, Method: ${req.method}, URL: ${req.url}`;
console.log(log);
fs.appendFileSync('server.log',log + '\n');
 next();
});


//req.method tells us the method that was used for request. In this case it is GET (app.get)
// req.url tells us the URL that was requested. ('\') in this case.


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
  // return 'Hat Bhosadike';
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


//&&&& This is the reason for putting maintainence middleware before static one. Assume that maintainence middleware was here
// and the static middleware was above that. :-
// {
//Since no call to next exists in maintainence middleware, We wont have further calls being executed. But the call to help.html will work.
//To avoid that we will need to re-order our calls. The express server is currently in static middleware and our maintainence
//middleware doesnt get a chace to execute.So we should have this maintainence call before express.staic
//}


app.get('/', (req,res) => {
//he funtion tells express what to return
res.render('home.hbs',{
   title: 'Home',
  big: 'Welcome to my page!',
  bod: 'Where the Dreamers come to Live!',
  Copyright: new Date().getFullYear(),
  header: 'E-mail: sarthak.pathak1998@gmail.com'
});
});

app.get('/about', (req,res) => {
  res.render('help.hbs',{
    Title: 'Help',
    big: 'About the page',
    Copyright: new Date().getFullYear(),
    header: 'E-mail: sarthak.pathak1998@gmail.com'

  })
});


app.get('/bad', (req,res) => {
  res.send({
    Error : 'Gateway not found'
  });
});
app.listen(3000, () => {
  console.log('Server connected to port 3000');
});     //To bind the app to  a port on our machine(Depends on the server you use);
//apps that use app.listen they are never gonna stop.
//you will have to use ctrl C. It might crash but it never stops since we have this binding set up here.
