const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Order = require('../../models/Order');
const User = require('../../models/User');
const Article = require('../../models/Article');

// @route   POST api/orders
// @desc    Create an order
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('articles', 'Les articles sont requis').not().isEmpty(),
      check('totalPrice', 'Le prix total est requis').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newOrder = new Order({
        customer: req.user.id,
        articles: req.body.articles,
        totalPrice: req.body.totalPrice,
      });

      const order = await newOrder.save();
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
);

// @route   GET api/orders
// @desc    Get all orders
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', ['name', 'email'])
      .populate('articles.article', ['name', 'price'])
      .sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});

// @route   GET api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', ['name', 'email'])
      .populate('articles.article', ['name', 'price']);

    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Commande non trouvée' });
    }
    res.status(500).send('Erreur du serveur');
  }
});

// @route   PUT api/orders/:id/status
// @desc    Update order status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Commande non trouvée' });
    }

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Commande non trouvée' });
    }
    res.status(500).send('Erreur du serveur');
  }
});

module.exports = router;
