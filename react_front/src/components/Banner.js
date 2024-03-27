import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Banner.css';
import logo from '../assets/logo.png';

function Banner() {
    const navigate = useNavigate();
    return (
        <div>
        <div className='banner'>
            <img src={logo} alt="logo de la ferme de Recornet" className='banner-logo' />
            <div className='banner-content'>
                <h1 className='banner-title'>La ferme de Recornet</h1>
                <div className='banner-buttons'>
                    <button className='banner-button' onClick={() => {navigate("/");}}>Accueil</button>
                    <button className='banner-button' onClick={() => {navigate("/achat");}}>Achat</button>
                    <button className='banner-button' onClick={() => {navigate("/panier");}}>Panier</button>
                </div>
            </div>
        </div>
        <div>
        <footer className="footer">
          <p>© 2024 La ferme de Recornet. Tous droits réservés.</p>
        </footer>
      </div>
      </div>
    )
}
export default Banner;
