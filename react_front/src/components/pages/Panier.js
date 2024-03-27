import React, { useState } from "react";
import { usePanier } from "../PanierContext";
import emailjs from 'emailjs-com'; // Importez le module EmailJS
import "../../styles/Panier.css"; // Import du fichier CSS
import image from '../../assets/steak.jpg';
import Banner from '../Banner'

function Panier() {

  const templateIDClient = "template_3ns12gc"
  const templateIDVendeur = "template_su3blld"
  
  const serviceID = "service_yt825eq"
  const userID = "WhJD9B8oAATOEHYRG"

  const { panierclient }  = usePanier();
  
  const panierString = panierclient
    .filter((produit) => produit.quantité > 0)
    .map((produit) => (
      `${produit.titre}, Quantité: ${produit.quantité}, Prix unitaire: ${produit.prix}€`
    ))
    .join('\n');

  

  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [emailUtilisateur, setEmailUtilisateur] = useState("");
  const [adresseUtilisateur, setAdresseUtilisateur] = useState("");


  // Fonction pour gérer le stock
  const gestion_stock = () => {
    panierclient.forEach(produit => {
      console.log("Produit: ", produit);
      console.log("Quantité: ", produit.quantité);
      console.log("ID: ", produit.id);
      fetch(`http://localhost:5038/api/app/Viandes/${produit.id}`)
        .then(response => response.json())
        .then(data => {
          console.log("Data: ", data);
          console.log("Stock: ", data.quantite);
          const newStock = data.quantite - produit.quantité;
          console.log("New stock: ", newStock);




          fetch(`http://localhost:5038/api/app/Viandes/${produit.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantite: newStock,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Data: ", data);
            });
        });
    });
  }

  // Fonction pour envoyer un e-mail
  const envoyerEmail = () => {

    if (nomUtilisateur!=="" && emailUtilisateur!=="" && adresseUtilisateur!==""){
      // Remplacez 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' et 'YOUR_USER_ID' par les valeurs de votre compte EmailJS
      emailjs.send(serviceID, templateIDClient, {
        to_email: emailUtilisateur, // Utiliser l'email saisi par l'utilisateur
        from_name: nomUtilisateur, // Utiliser le nom saisi par l'utilisateur
        panier_details: panierString // Ajoutez les détails du panier en format texte
      }, userID)
      .then((result) => {
        console.log(result.text);
        alert('E-mail envoyé avec succès!');
      }, (error) => {
        console.log(error.text);
        alert('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
      });
    
      emailjs.send(serviceID, templateIDVendeur, {
        to_email: emailUtilisateur, // Utiliser l'email saisi par l'utilisateur
        from_name: nomUtilisateur, // Utiliser le nom saisi par l'utilisateur
        panier_details: panierString, // Ajoutez les détails du panier en format texte
        adresse_postale: adresseUtilisateur
      }, userID)

    } else {
      alert("Remplissez le formulaire !");
    }
  }
    

  return (
    <div>
    <Banner />
    <div className="panier-container">
  
      <h2 className="panier-title">Panier</h2>

      
      
      <div className="panier-items">
        {panierclient.map((produit) => (
          produit.quantité > 0 && (
            <div key={produit.id} className="panier-item">
              <img src={image} alt="Steak" className="item-image"/>
              <div className="item-details">
                <h3 className="item-title">{produit.titre}   </h3>
                <h4 className="item-price">Prix indicatif : {produit.prix*produit.quantité}€</h4>
                <h5 className="item-quantity">Quantité : {produit.quantité}</h5>
              </div>
            </div>
          )
        ))}
      </div>
            
      {/* Zone de texte pour le nom de l'utilisateur */}
      <input
        type="text"
        placeholder="Nom"
        value={nomUtilisateur}
        onChange={(input) => setNomUtilisateur(input.target.value)}
      />

      {/* Zone de texte pour l'adresse e-mail de l'utilisateur */}
      <input
        type="email"
        placeholder="Adresse e-mail"
        value={emailUtilisateur}
        onChange={(input) => setEmailUtilisateur(input.target.value)}
      />

      {/* Zone de texte pour l'adresse postale de l'utilisateur */}
      <input
        type="text"
        placeholder="Adresse postale"
        value={adresseUtilisateur}
        onChange={(input) => setAdresseUtilisateur(input.target.value)}
      />
      
      <button className="button-valider-panier" onClick={()=>gestion_stock()}>Valider Panier</button>
    </div>
    </div>
  );
}

export default Panier;
