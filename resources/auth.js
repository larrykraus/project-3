var jwt = require('jwt-simple'),
    moment = require('moment');
var TOKEN_SECRET = process.env.TOKEN_SECRET || require('../config/env').key;

module.exports = {
  /*
  * Login Required Middleware
  */
  ensureAuthenticated: function (req, res, next) {
    console.log('This is the req from ensureAuthenticated: ' + req);
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = null;

    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET || TOKEN_SECRET);
      console.log(TOKEN_SECRET);
    }
    catch (err) {
      return res.status(401).send({ message: err.message });
    }
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Token has expired.' });
    }
    req.user = payload.sub;
    console.log("is this the req.user: " + req.user)
    next();
  },

  /*
  * Generate JSON Web Token
  */
  createJWT: function (user) {
    console.log('This is the token secret' + TOKEN_SECRET);
    var payload = {
      sub: user.id,
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET || TOKEN_SECRET);
  }
};