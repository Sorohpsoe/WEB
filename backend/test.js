const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://baptrgtt:password@steakgenerator.aqcbsvs.mongodb.net/?retryWrites=true&w=majority&appName=SteakGenerator', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Définir le schéma pour la collection "Viandes"
const ViandeSchema = new mongoose.Schema({
  type: String,
  quantite: Number
});

// Créer le modèle à partir du schéma
const Viande = mongoose.model('Viande', ViandeSchema);

// Créer un nouveau document dans la collection "Viandes"
const viande = new Viande({ type: 'Boeuf', quantite: 5 });


// Sauvegarder le document dans la collection "Viandes"
viande.save()
  .then(() => {
    console.log('Document créé avec succès !');
  })
  .catch((err) => console.log('Erreur lors de la création du document : ', err));

/*
  // Supprimer tous les documents de type "Boeuf"
  Viande.deleteMany({ type: 'Boeuf' })
    .then(() => {
      console.log('Documents de type "Boeuf" supprimés avec succès !');
    })
    .catch((err) => console.log('Erreur lors de la suppression des documents :', err));

*/
// Rajouter +1 à la quantité de viande de type "Boeuf"
Viande.updateOne({ type: 'Boeuf' }, { $inc: { quantite: 1 } })
  .then(() => {
    console.log('Quantité de viande de type "Boeuf" mise à jour avec succès !');
  })
  .catch((err) => console.log('Erreur lors de la mise à jour de la quantité de viande :', err));

  // Rechercher tous les documents dans la collection "Viandes"
  Viande.find()
    .then((documents) => {
      console.log('Documents trouvés :', documents);
    })
    .catch((err) => console.log('Erreur lors de la recherche des documents :', err));