const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  articles: [
    {
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Reçu', 'En traitement', 'Lavé', 'Repassé', 'Prêt', 'Livré'],
    default: 'Reçu',
  },
  depositDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    enum: ['Payé', 'Impayé'],
    default: 'Impayé',
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
