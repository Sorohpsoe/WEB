import IconeProduit from './IconeProduit.js';
import image from '../assets/steak.jpg';
import Banner from './Banner'

// Afficher l'image importée
function App(){
  // Liste des prix
  const prix = [
    { id: 0, titre: "Produit A", prix: 10 },
    { id: 1, titre: "Produit B", prix: 20 },
    { id: 2, titre: "Produit C", prix: 30 },
    { id: 3, titre: "Produit D", prix: 40 },
  ];

  return(
    <div>
      {prix.map((liste) => (
        <IconeProduit image={image} liste={liste}/>
      ))}
      <Banner /> 
    </div>
  )
}

export default App;
