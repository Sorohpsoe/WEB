const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://baptrgtt:password@steakgenerator.aqcbsvs.mongodb.net/?retryWrites=true&w=majority&appName=SteakGenerator';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log('Connexion à MongoDB échouée !', err);
  } else {
    console.log('Connexion à MongoDB réussie !');
    client.close();
  }
});