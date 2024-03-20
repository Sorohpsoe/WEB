import '../styles/Banner.css'
import logo from '../assets/logo.png'

function Banner() {
    return (
        <div className='banner'>
            <img src={logo} alt="logo de la ferme de Recornet" className='banner-logo' />
            <h1 className='banner-title'>La ferme de Recornet</h1>
        </div>
    )
}

export default Banner