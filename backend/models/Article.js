const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

module.exports = Article = mongoose.model('article', ArticleSchema);
