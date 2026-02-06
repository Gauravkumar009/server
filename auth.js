const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // console.log('Received credentials:', username, password);
      const user = await Person.findOne({
        $or: [
          { email: username },
          { username: username }
        ]
      });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Wrong password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);


module.exports = passport;
