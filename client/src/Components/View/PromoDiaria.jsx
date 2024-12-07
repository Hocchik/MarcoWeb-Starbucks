
import Promo from './PromoDiaria.json'

const Promos = Promo.Dias;

function PromoDiaria() {

const day =  new Date().getDay();

    const PromoToday = Promos[day-1];


    return (
      <div className="container flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col ml-20 md:flex-row items-center">
      
      <div className="mt-8 mr-1 md:mt-0 w-2/5">
          <h1 className="text-green-600 text-4xl md:text-6xl font-bold mb-4">Promo {PromoToday.dia}</h1>
          <p className="text-white-600 text-lg md:text-xl mb-4">{PromoToday.description}</p>
          
      </div>
      <div className="w-3/5 ml-20 flex flex-col md:flex-row items-center">
      {PromoToday.products.map((product) => (
          <img key={product.id} src={product.image} alt={product.name} className="w-64 h-80 md:w-96 md:h-80" />
      ))}
      </div>
    </div>
    </div>
  )
}

export default PromoDiaria