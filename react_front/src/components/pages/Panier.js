import React from "react";
import { usePanier } from "../PanierContext";
import emailjs from 'emailjs-com'; // Importez le module EmailJS
import "../../styles/Panier.css"; // Import du fichier CSS
import image from '../../assets/steak.jpg';
import Banner from '../Banner'


function Panier() {
  
  const templateID = "template_3ns12gc"
  const serviceID = "service_yt825eq"
  const userID = "WhJD9B8oAATOEHYRGnope"

  const { panierclient }  = usePanier();
  console.log(panierclient);

  // Fonction pour envoyer un e-mail
  const envoyerEmail = () => {
    // Remplacez 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' et 'YOUR_USER_ID' par les valeurs de votre compte EmailJS
    emailjs.send(serviceID, templateID, {
      to_email: 'tangskor@gmail.com', // Remplacez par l'adresse e-mail du destinataire
      from_name: 'Tanguy', // Remplacez par votre nom ou votre nom d'entreprise
      // Ajoutez d'autres champs du modèle d'e-mail si nécessaire
      panier_details: JSON.stringify(panierclient) // Ajoutez les détails du panier au modèle d'e-mail
    }, userID)
    .then((result) => {
      console.log(result.text);
      alert('E-mail envoyé avec succès!');
    }, (error) => {
      console.log(error.text);
      alert('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
    });
  };

  return (
    <div>
      <Banner />
      <div className="panier-container"></div>
      <h2 className="panier-title">Panier</h2>

      <div className="panier-items"></div>

      {panierclient.map((produit) => (
        <div key={produit.id} className="panier-item">
          <img src={image} alt="Steak" className="item-image" />
          <div className="item-details">
            <h3 className="item-title">{produit.titre}</h3>
            <p className="item-price">Prix indicatif : {produit.prix}€</p>
            <p className="item-quantity">Quantité : {produit.quantité}</p>
            {/* Ajout de l'image de steak */}

          </div>
        </div>
      ))}
      <button className="button-valider-panier" onClick={envoyerEmail}>Valider Panier</button>
    </div>
  );
}

export default Panier;
