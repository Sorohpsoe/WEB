const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://baptrgtt:paslemotdepasse@steakgenerator.aqcbsvs.mongodb.net/STEAK_GENERATOR_DB?retryWrites=true&w=majority&appName=SteakGenerator', { useNewUrlParser: true, useUnifiedTopology: true })  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Définir le schéma pour la collection "Viandes"
const ViandeSchema = new mongoose.Schema({
  nom: String,
  cat1 : String,
  cat2 : String,
  poids: Number,
  prix_kilo: Number,
  description: String,
});

const FactureSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  adresse: String,
  email: String,
  telephone: String,
  date: Date,
  liste_produits_quantite: {},
  prix_total: Number,
  notes: String
});


// Créer le modèle à partir du schéma
const Viande = mongoose.model('Viande', ViandeSchema);

const Facture = mongoose.model('Facture', FactureSchema);

;


async function addViande(new_nom,new_cat1, new_cat2, new_poids, new_prix_kilo, new_description) {
  try {
    let viande;
    viande = new Viande({
      nom: new_nom,
      cat1: new_cat1,
      cat2: new_cat2,
      poids: new_poids,
      prix_kilo: new_prix_kilo,
      description: new_description
    });


    await viande.save();

    console.log('Viande créé avec succès !');

  } catch (err) {
    console.log('Erreur lors de la création de la viande : ', err);
  }
}


async function addFacture(new_nom,new_prenom,new_adresse,new_email,new_telephone,new_date,new_liste,new_total,new_notes) {
  try {
    let facture;

    facture = new Facture({
      nom: new_nom,
      prenom: new_prenom,
      adresse: new_adresse,
      email: new_email,
      telephone: new_telephone,
      date: new_date,
      liste_produits_quantite: new_liste,
      prix_total: new_total,
      notes: new_notes
    });

    await facture.save();

    console.log('Facture créé avec succès !');
    
  } catch (err) {
    console.log('Erreur lors de la création de la facture : ', err);
  }
}


//addViande('Poulet', 10, 'Viande de poulet de qualité supérieure', 5);
//addFacture('John', 'Doe', '123 Main St', 'john@example.com', '555-1234', new Date(), { id_steak: 2, id_cotelette: 3 }, 50, 'Some notes');

/*
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

/*
// Rajouter +1 à la quantité de viande de type "Boeuf"
Viande.updateOne({ type: 'Boeuf' }, { $inc: { quantite: 1 } })
  .then(() => {
    console.log('Quantité de viande de type "Boeuf" mise à jour avec succès !');
  })
  .catch((err) => console.log('Erreur lors de la mise à jour de la quantité de viande :', err));
*/


// Rechercher tous les documents dans la collection "Viandes"
Viande.find()
  .then((documents) => {
    console.log('Documents trouvés :', documents);
  })
  .catch((err) => console.log('Erreur lors de la recherche des documents :', err));
    //fin de la connexion