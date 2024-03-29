const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://baptrgtt:WYk7zg1W9LZeRk2G@steakgenerator.aqcbsvs.mongodb.net/STEAK_GENERATOR_DB?retryWrites=true&w=majority&appName=SteakGenerator";

mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to the database!"))
  .catch(error => console.error("Could not connect to the database:", error));

  const productSchema = new mongoose.Schema({
    id: String,
    nom: String,
    cat1: String,
    cat2: String,
    poids: Number,
    prix_kilo: Number,
    description: String,
    id_image: String,
    poids_indicatif: Number,
  });
  
  const Product = mongoose.model('Product', productSchema, 'viande');

app.listen(5038, () => {
  console.log("Server is listening on port 5038");
});

app.get('/api/app/Viandes', (request, response) => {
    Product.find()
      .then(products => {
        response.json(products);
      })
      .catch(error => {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
      });
  });
  
app.get('/api/app/Viandes/:id', (request, response) => {
    const productId = request.params.id;
    const int_id = parseInt(productId);
  
    Product.findOne({ id: int_id })
      .then(product => {
        if (product) {
          response.json(product);
        } else {
          response.status(404).json({ message: 'Produit non trouvé.' });
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit.' });
      });
  });

  app.put('/api/app/Viandes/:id', (request, response) => {
    const productId = request.params.id;
    const productData = request.body;
    const int_id = parseInt(productId);
  
    Product.findOneAndUpdate({ id: int_id }, productData, { new: true })
      .then(product => {
        if (product) {
          response.json(product);
        } else {
          response.status(404).json({ message: 'Produit non trouvé.' });
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit.' });
      });
  });
  
  app.delete('/api/app/Viandes/:id', (request, response) => {
    const productId = request.params.id;
    const int_id = parseInt(productId);
  
    Product.findOneAndRemove({ id: int_id })
      .then(result => {
        if (result) {
          response.json({ message: 'Produit supprimé avec succès.' });
        } else {
          response.status(404).json({ message: 'Produit non trouvé.' });
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la suppression du produit.' });
      });
  });