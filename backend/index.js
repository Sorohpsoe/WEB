var Express   = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
const { mongo } = require('mongoose');

var app = Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://baptrgtt:WYk7zg1W9LZeRk2G@steakgenerator.aqcbsvs.mongodb.net/?retryWrites=true&w=majority&appName=SteakGenerator"


var DATABASE_NAME = "STEAK_GENERATOR_DB";
var database;





app.listen(5038, () =>{
    Mongoclient.connect(CONNECTION_STRING,(error, client) => {
        database = client.db(DATABASE_NAME);
        console.log("Connected to `" + DATABASE_NAME + "`!");
    })

})
// Route pour obtenir un document spécifique en fonction de l'ID
app.get('/api/app/Viandes/:id', (request, response) => {
    const produitId = request.params.id;
    const int_id = parseInt(produitId);
  
    database.collection('items').findOne({ id: int_id }, (error, result) => {
      if (error) {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération du produit.' });
      } else {
        response.json(result);
      }
    });
  });
  
  // Route pour obtenir tous les documents
  app.get('/api/app/Viandes', (request, response) => {
    database.collection('items').find().toArray((error, result) => {
      if (error) {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits.' });
      } else {
        response.json(result);
      }
    });
  });

app.post("/api/app/AddViandes",multer().none(), (request, response) => {
    database.collection("items").count({},function(error, numOfDocs)
    {
        database.collection("items").insertOne({
            id: (numOfDocs+1).toString(),
            nom: request.body.nom,
            description: request.body.description,
            poids: request.body.poids,
            quantite: request.body.quantite,
            prix: request.body.prix
        });
        response.json("Item added successfully");
    });

});

app.delete("/api/app/DeleteViandes", (request, response) => {
    database.collection("items").deleteOne({
        id: request.query.id
    });
    response.json("Item deleted successfully");
}) 



app.put('/api/app/Viandes', (request, response) => {
  const produitId = request.query.id;
  const newStock = request.body.quantite;

  database.collection('items').updateOne(
    { id: produitId },
    { $set: { quantite: newStock } },
    (error, result) => {
      if (error) {
        console.error('Erreur:', error);
        response.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour du produit.' });
      } else {
        response.json({ message: 'Produit mis à jour avec succès.' });
      }
    }
  );
});