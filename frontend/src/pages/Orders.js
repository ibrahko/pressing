import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    const fetchArticles = async () => {
      try {
        const res = await axios.get('/api/articles', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        setArticles(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchOrders();
    fetchArticles();
  }, []);

  const onArticleChange = (e) => {
    const articleId = e.target.value;
    const article = articles.find((a) => a._id === articleId);
    if (article && !selectedArticles.find((a) => a.article._id === articleId)) {
      setSelectedArticles([
        ...selectedArticles,
        { article: article, quantity: 1 },
      ]);
      setTotalPrice(totalPrice + article.price);
    }
  };

  const onQuantityChange = (e, articleId) => {
    const quantity = parseInt(e.target.value);
    const newSelectedArticles = selectedArticles.map((item) => {
      if (item.article._id === articleId) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setSelectedArticles(newSelectedArticles);
    const newTotalPrice = newSelectedArticles.reduce(
      (acc, item) => acc + item.article.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      articles: selectedArticles.map((item) => ({
        article: item.article._id,
        quantity: item.quantity,
      })),
      totalPrice,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const body = JSON.stringify(newOrder);
      const res = await axios.post('/api/orders', body, config);
      setOrders([res.data, ...orders]);
      setSelectedArticles([]);
      setTotalPrice(0);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Commandes</h1>
      <p className="lead">
        <i className="fas fa-box-open"></i> Gérer les commandes
      </p>
      <div className="orders-form">
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select name="article" onChange={(e) => onArticleChange(e)}>
              <option value="0">Sélectionner un article</option>
              {articles.map((article) => (
                <option key={article._id} value={article._id}>
                  {article.name} - {article.price} €
                </option>
              ))}
            </select>
          </div>
          <div className="selected-articles">
            {selectedArticles.map((item) => (
              <div key={item.article._id} className="selected-article">
                <span>{item.article.name}</span>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => onQuantityChange(e, item.article._id)}
                  min="1"
                />
              </div>
            ))}
          </div>
          <h3>Total: {totalPrice.toFixed(2)} €</h3>
          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Créer la commande"
          />
        </form>
      </div>
      <div className="orders">
        {orders.map((order) => (
          <div key={order._id} className="order bg-light">
            <div>
              <h4>Commande #{order._id.substring(0, 6)}</h4>
              <p>Client: {order.customer.name}</p>
              <p>Status: {order.status}</p>
              <p>Total: {order.totalPrice.toFixed(2)} €</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
