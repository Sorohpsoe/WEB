const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://baptrgtt:WYk7zg1W9LZeRk2G@steakgenerator.aqcbsvs.mongodb.net/?retryWrites=true&w=majority&appName=SteakGenerator';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log('Tentative de connexion à MongoDB...');

client.connect().then(() => {
  console.log('Connexion à MongoDB réussie !');
  client.close();
}).catch(err => {
  console.log('Connexion à MongoDB échouée !', err);
});