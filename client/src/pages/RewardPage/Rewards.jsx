import Footer from "../../Components/Footer"
import Navbar from "../../Components/View/NavBar"
import RewardHand from "../../imgs/RewardsHand_new.png.webp"
import "./Reward.css"


function Rewards() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row items-center md:items-start bans">

      <div className="w-full md:w-4/3 justify-start mr-48 my-10">
        <h2 className="text-2xl text-center font-bold text-green-700 mb-4">Descarga la app Starbucks® Rewards</h2>
        <p className="text-gray-600 text-center mb-6">Accede a un universo de beneficios y haz que tus días brillen más</p>

        <div className="flex justify-center mb-7">
            <button className="bg-green-700 hover:bg-green-600  text-white font-bold py-2 px-4 w-30 rounded-full">Saber Más</button>
        </div>


        <div className="grid grid-cols-1 gap-4 mt-9">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-full md:w-1/2 ml-5">
                <img src={RewardHand} alt="Mano tocando una estrella" className="w-full md:w-96" />
            </div>
            <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold text-green-700 mb-2">Crea tu cuenta</h2>
                <p className="text-gray-600 mb-4">El registro es rápido y fácil. Descarga la app Starbucks® Rewards España y regístrate creando una cuenta.</p>
            <div className="flex flex-col items-center gap-4">
                <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 w-48 rounded-full">Descarga la app</button>
                <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 w-48 rounded-full">Inicia sesión</button>
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Footer/>
    </>
  )
}

export default Rewards