const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const OAuthStrategy = require("passport-google-oauth2").Strategy;
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(express.urlencoded({ extended: true }));
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
                    }
                    )
                    await user.save();
                }
                return done(null, user);
            }
            catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "https://zenwalls-wallpapers.vercel.app/main",
}), (req, res) => {
    console.log("Authentication successful");
});


app.get("/validate", async (req, res) => {
    if (req.headers.cookie) {
        // Credentials received
        console.log('Credentials received:', req.headers.cookie);
        res.send('Credentials received');
    }
    if (req.isAuthenticated()) {
        const user = await User.findById(req.user._id);
        res.json({ loggedIn: true, userDetails: req.user, userFavourites: user.favourites });
    }
    else {
        res.json({ loggedIn: false });
    }
});

app.post("/setFavourite", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const newItem = req.body.image.id;
            const user = await User.findById(userId);
            if (user.favourites.some(favorite => favorite.id === newItem)) {
                console.log("11")
                return res.status(200).json(0);
            } else {
                await User.findByIdAndUpdate(userId, { $push: { favourites: req.body.image } });
                res.status(200).json(1);
            }
        } else {
            res.status(401).json({ message: "User not authenticated" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/removeFavourite", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const imageIdToRemove = req.body.image.id;
            const user = await User.findById(userId);
            if (user.favourites.some(favorite => favorite.id === imageIdToRemove)) {
                await User.findByIdAndUpdate(userId, { $pull: { favourites: { id: imageIdToRemove } } });
                res.status(200).json({ success: true, message: "Image removed from favorites successfully" });
            } else {
                res.status(404).json({ success: false, message: "Image not found in favorites" });
            }
        } else {
            res.status(401).json({ success: false, message: "User not authenticated" });
        }
    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
app.get("/logout", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error signing out");
        }else{
            console.log("done")
        }
    });
});
app.get("/", (req, res) => {
    res.send("server up")
});
app.listen(2000, () => {
    console.log("server is up at port 2000")
}) 