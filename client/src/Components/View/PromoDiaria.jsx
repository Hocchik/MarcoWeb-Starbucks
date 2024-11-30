import { useEffect } from 'react';
import { useAuth } from '../../context/ClientContext.jsx'
import imgs from "../../imgs/Imagenes.js"

function PromoDiaria() {

    let dailypromo = [
    { producto: "", descuento: "", img: ""}
    ] 

  const {getPromociones, promos} = useAuth()
  console.log(promos.length)
  const today =  new Date().getDate();

    for(let i = 0; i < promos.length; i++) {
        const day = new Date(promos[i].date).getDate();
        console.log(day)
        console.log(today)
        if(day===today){
            dailypromo[0].producto = promos[i].producto;
            dailypromo[0].descuento = promos[i].descuento;
            break;
        }
        
    }

        console.log(dailypromo[0])

  useEffect(() => {
    getPromociones();
  }, [])
  

    return (
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="flex flex-col md:flex-row items-center">
      <img src={imgs.img2} alt="Coffee" className="w-48 h-64 md:w-64 md:h-80 mr-8" />
      <img src="" alt="Frappuccino" className="w-48 h-64 md:w-64 md:h-80" />
    </div>
    <div className="mt-8 md:mt-0">
          <h1 className="text-green-700 text-4xl md:text-6xl font-bold mb-4">Promo Jueves</h1>
          <p className="text-gray-600 text-lg md:text-xl mb-4">Descubre las mejores recomendaciones para tu día. ¡Tenemos la bebida perfecta para ti!</p>
          <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">Ver recomendaciones</button>
    </div>
    </div>
  )
}

export default PromoDiaria