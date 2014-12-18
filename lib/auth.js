var passport = require('koa-passport')
var co = require('co')
var User = require('./../model/user');

passport.serializeUser(function(user, done) {
    console.log("se")
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {

    co(function*(){
        console.log("de")
        var user = yield User.find(id)
        done(null, user)
    })
   
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
    console.log(1)
    co(function*(){
        console.log(2)
        var user = yield User.find({ where: {guestId: username} })
        console.log(3)
        //console.log(user)
        if(user){
            console.log("auth")
            done(null, user)
        }else{
            done(null, false)
        }
    })
    

    //done(null, user)
    
}))

var FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy({
        clientID: 'your-client-id',
        clientSecret: 'your-secret',
        callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
    },
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        done(null, user)
    }
))

var TwitterStrategy = require('passport-twitter').Strategy
passport.use(new TwitterStrategy({
        consumerKey: 'your-consumer-key',
        consumerSecret: 'your-secret',
        callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
    },
    function(token, tokenSecret, profile, done) {
        // retrieve user ...
        done(null, user)
    }
))

var GoogleStrategy = require('passport-google').Strategy
passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback',
        realm: 'http://localhost:' + (process.env.PORT || 3000)
    },
    function(identifier, profile, done) {
        // retrieve user ...
        done(null, user)
    }
))

exports.setRoutes = function(app) {
    app.post('/login', function*(next) {
      var ctx = this
      yield* passport.authenticate('local', function*(err, user, info) {
        console.log(err, user, info)
        if(user){
            yield ctx.login(user)
            ctx.jsonResp(200, "/account")
        }else{
            ctx.jsonResp(401, "/")
        }
      }).call(this, next)
    });

    app.get('/logout', function * (next) {
        this.logout()
        this.redirect('/')
    })

    app.get('/auth/facebook',
        passport.authenticate('facebook')
    )

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/account',
            failureRedirect: '/'
        })
    )

    app.get('/auth/twitter',
        passport.authenticate('twitter')
    )

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/account',
            failureRedirect: '/'
        })
    )

    app.get('/auth/google',
        passport.authenticate('google')
    )

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/account',
            failureRedirect: '/'
        })
    )
}
