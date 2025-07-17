const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connecter à la base de données
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API du pressing en cours d\'exécution...');
});

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/orders', require('./routes/api/orders'));

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
