var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
var User = require('../models/User');

// get home Page
router.get('/', async (req, res) => {
  try {
    var articles = await Article.find({});
    res.render('allArticle', { articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get('/new', function (req, res, next) {
  res.render('createArticle');
});

router.post('/', async (req, res) => {
  try {
    var article = await Article.create(req.body);
    return res.redirect('/article');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//find by id

router.get('/:id/detail', async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findById(id, req.body);
    res.render('articleDetail', { article });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//delete a article
router.get('/:id/delete', async (req, res) => {
  try {
    var id = req.params.id;
    var article = await Article.findByIdAndDelete(id, req.body);
    return res.redirect('/article');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// article edit

router.get('/:id', async (req, res) => {
  try {
    var { id } = req.params;
    var articles = await Article.findById(id);
    res.render('articleEdit', { article: articles });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.post('/:id', async (req, res) => {
  try {
    var id = req.params.id;
    var articles = await Article.findByIdAndUpdate(id, req.body);
    res.redirect('/article/' + id + '/detail');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
