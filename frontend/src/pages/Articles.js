import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    service: '',
  });

  const { name, category, price, service } = formData;

  useEffect(() => {
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
    fetchArticles();
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      name,
      category,
      price,
      service,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      const body = JSON.stringify(newArticle);
      const res = await axios.post('/api/articles', body, config);
      setArticles([res.data, ...articles]);
      setFormData({ name: '', category: '', price: '', service: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Articles</h1>
      <p className="lead">
        <i className="fas fa-tshirt"></i> Gérer les articles
      </p>
      <div className="articles-form">
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nom de l'article"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Catégorie"
              name="category"
              value={category}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Prix"
              name="price"
              value={price}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Service"
              name="service"
              value={service}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Ajouter"
          />
        </form>
      </div>
      <div className="articles">
        {articles.map((article) => (
          <div key={article._id} className="article bg-light">
            <div>
              <h4>{article.name}</h4>
              <p>Catégorie: {article.category}</p>
              <p>Prix: {article.price} €</p>
              <p>Service: {article.service}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
