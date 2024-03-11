const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const OAuthStrategy = require("passport-google-oauth2").Strategy;
const app = express();
require('dotenv').config();
app.use(cookieParser());

app.use(express.json());

app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: 'None',
    secure: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const cors = require("cors");
const corsOptions = {
  origin: 'https://zenwalls-wallpapers.vercel.app',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));



var conn = mongoose.createConnection("mongodb+srv://Yash:" + process.env.MONGOPASSWORD + "@cluster0.djeqndd.mongodb.net/zenwallUsers?retryWrites=true&w=majority");
var User = conn.model('users', new mongoose.Schema({
  gId: {
    type: String
  },
  email: {
    type: String
  },
  image: {
    type: String
  },
  favourites: {
    type: Array
  }

}));

passport.use(
  new OAuthStrategy({
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ gId: profile.id });
      if (!user) {
        user = new User({
          gId: profile.id,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          favourites: []
        })
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
})
passport.deserializeUser((user, done) => {
  done(null, user);
})

// Modified route to ensure cookie setting after successful authentication
app.get("/auth/google/callback", (req, res) => {
  passport.authenticate("google", { failureRedirect: "https://zenwalls-wallpapers.vercel.app" })(req, res, () => {
    // Set session cookie here (assuming successful authentication)
    req.session.user = req.user; // Store user object in session
    res.cookie("session", req.sessionID, { // Set the session cookie
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.redirect("https://zenwalls-wallpapers.vercel.app/main"); // Redirect to your main application
  });
});

app.get("/validate", async (req, res) => {
  if (req.headers.cookie) {
    console.log('Credentials received:', req.headers.cookie);
  } else {
    console.log('No credentials received');
  }
  if (req.isAuthenticated()) {
    const user = await User.findById(req.user._id);
    res.json({ loggedIn: true, userDetails: req.user, userFavourites: user.favourites });
  } else {
    res.json({ loggedIn: false });
  }
});

// ... other routes for setting/removing favorites, logout, etc. (unchanged)

app.listen(2000, () => {
  console.log("server is up at port 2000")
})
