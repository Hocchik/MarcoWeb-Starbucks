import Navbar from "../../Components/View/NavBar.jsx";
import Footer from "../../Components/Footer.jsx";
import VistaPrincipal from "../../Components/View/VistaPrincipal.jsx";
import Imagenes from "../../imgs/Imagenes.js";

function HomePage() {
  return (
    <>
    <Navbar/>
    <div className="py-10 bans my-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <img src={Imagenes.img1} alt="Frapuccino" className="w-72 h-64 md:w-96 md:h-80 " />
        </div>
        <div className="mt-8 mr-6 md:mt-0 bans-text">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Más que café, una experiencia.</h1>
          <p className="text-lg md:text-xl mb-4">Un lugar para conectar, compartir y disfrutar de una buena bebida con Starbucks.</p>
          <button className="hover:opacity-90 text-white font-bold py-2 px-4 rounded-md">Mira nuestro menú</button>
        </div>
      </div>
    </div>
    <VistaPrincipal/>
    <Footer/>

    </>
  )
}

export default HomePage