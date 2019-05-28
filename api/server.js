const express = require('express'),
    uuid = require('uuid/v4'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    MongoStore = require('connect-mongo')(session),
    bcrypt = require('bcrypt-nodejs'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    btoa = require('btoa'),
    config = require('./DB');

const accountRoute = require('./routes/account.route');
const Account = require('./models/Account');

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

//passport setup
// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    Account.findOne({ 'email': email}, function(err, account){
      if(err) return done(err);
      if(!account) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      if (!bcrypt.compareSync(password, account.password)) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, account);
    });
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  Account.findOne({ 'email': email}, function(err, account) {
    if(err) return done(err, false);
    return done(null, account);
  });
});

//express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
//  origin: 'http://localhost:4200',
//  credentials: true
}));
app.use('/account', accountRoute);
app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60
  }),
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/public", [express.static("../dist/app1")]);

app.use("/simulation", [express.static("../dist/app2")]);

// create the homepage route at '/'
app.get('/', (req, res) => {
  res.send(`You got home page!\n`)
})

// create the login get and post routes
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

app.get('/testapi', (req, res) => {
  res.send(`You got the test page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send({"authenticated": false, "message": info.message})}
    if (err) { return next(err); }
    //if (!user) { return res.redirect('/login'); }
    if (!user) { return next(err); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      //return res.redirect('/authrequired');
      return res.send({"authenticated": true, "message": "success"})
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  if(req.isAuthenticated()) {
    res.send({"message":'you hit the authentication endpoint'})
  } else {
    res.redirect('/')
  }
})

app.use("/admin", [function (req, res, next) {
  if (!req.isAuthenticated()) {
      return res.redirect('/public/#/login');
  }
  next();
},express.static("../dist/account-example")]);

const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
