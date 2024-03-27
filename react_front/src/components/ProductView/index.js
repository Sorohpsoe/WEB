import React from 'react'
import '../../styles/ProductView.css'; // Assurez-vous que le fichier CSS est correctement importé
import steak from '../../assets/steak.jpg'
import { useParams } from 'react-router-dom';

// Supposons que vos produits soient stockés dans un tableau nommé 'products'
const products = [
  { id: 0, name: 'Produit 1', description: 'Description du produit 1' },
  { id: 1, name: 'Produit 2', description: 'Description du produit 2' },
  { id: 2, name: 'Produit 3', description: 'Description du produit 3' },
  // Ajoutez d'autres produits au besoin
];


function ProductView() {
  // Récupérer l'ID du produit à partir de l'URL
  const { id } = useParams();


  // Trouvez le produit correspondant à l'ID dans le tableau de produits
  const product = products.find(product => product.id === parseInt(id));
  // Vérifier si le produit existe
  if (!product) {
    return <div>Produit non trouvé</div>;
  } else {
    return (
      <div className="container">
        <div className="product">
          <img src={steak} alt="La mère à tanguy" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Prix: $00.00</p>
          <a href="#" className="button">Acheter maintenant</a>
        </div>
        <footer className="footer">
          <p>© 2024 Votre entreprise. Tous droits réservés.</p>
        </footer>
      </div>
    );
  }
}
export default ProductView;