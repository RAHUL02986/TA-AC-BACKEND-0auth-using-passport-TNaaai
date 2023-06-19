var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register');
});

router.post('/', async (req, res) => {
  try {
    var user = await User.create(req.body);
    res.redirect('/register/login');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', async (req, res) => {
  try {
    var { email, password } = req.body;
    if (!password || !email) {
      return res.redirect('/register/login');
    }
    var user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/register/login');
    }
    user.verifyPassword(password, (result) => {
      if (!result) {
        return res.redirect('/register/login');
      }
    });
    req.session.userId = user.id;
    return res.render('articles');
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/register/login');
});

module.exports = router;
