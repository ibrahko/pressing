const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Article = require('../../models/Article');

// @route   POST api/articles
// @desc    Create an article
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Le nom est requis').not().isEmpty(),
      check('category', 'La catégorie est requise').not().isEmpty(),
      check('price', 'Le prix est requis').isNumeric(),
      check('service', 'Le service est requis').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newArticle = new Article({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        service: req.body.service,
      });

      const article = await newArticle.save();
      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
);

// @route   GET api/articles
// @desc    Get all articles
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// @route   GET api/articles/:id
// @desc    Get article by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article non trouvé' });
    }

    res.json(article);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article non trouvé' });
    }
    res.status(500).send('Erreur du serveur');
  }
});

// @route   DELETE api/articles/:id
// @desc    Delete an article
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article non trouvé' });
    }

    await article.remove();

    res.json({ msg: 'Article supprimé' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article non trouvé' });
    }
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
