import '../styles/Banner.css'
import logo from '../assets/logo.png'

function Banner() {
    return (
        <div>
        <div className='banner'>
            <img src={logo} alt="logo de la ferme de Recornet" className='banner-logo' />
            <h1 className='banner-title'>La ferme de Recornet</h1>
        </div>
        <div>
        <footer className="footer">
          <p>© 2024 La ferme de Recornet. Tous droits réservés.</p>
        </footer>
      </div>
      </div>
    )
}

export default Banner