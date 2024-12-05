import Footer from "../../Components/Footer"
import Navbar from "../../Components/View/NavBar"


const TiendasPlaces = [
    {
      "id": 1,
      "name": "Starbucks Jockey Plaza",
      "address": "Av. Javier Prado Este 4200, Santiago de Surco, Lima",
      "phone": "(01) 637-1234",
      "URL": "https://lh3.googleusercontent.com/p/AF1QipN3hpHnKgxVC_GuBaM_cq0r_g1ivajizCy7TAxr=s1360-w1360-h1020"
    },
    {
      "id": 2,
      "name": "Starbucks Larcomar",
      "address": "Malecón de la Reserva 610, Miraflores, Lima",
      "phone": "(01) 617-6000",
      "URL": "https://lh3.googleusercontent.com/p/AF1QipPFLw41u91ueEigNbeBqt4ALbk0lGDdKAeTY0vS=s1360-w1360-h1020"  
    },
    {
      "id": 3,
      "name": "Starbucks Plaza Norte",
      "address": "Av. Tomas Valle 100, Independencia, Lima",
      "phone": "(01) 500-1234",
      "URL": "https://plazanorte.pe/wp-content/uploads/2024/03/3-1-3.jpg"
    },
    {
      "id": 4,
      "name": "Starbucks San Isidro",
      "address": "Av. Juan de Arona 130, San Isidro, Lima",
      "phone": "(01) 421-5678",
      "URL": "https://lh3.googleusercontent.com/p/AF1QipNN5-vk0EGsJuFF-iSx4GFp1cuqDhmsdMixPpBr=s1360-w1360-h1020"  
    }
  ]

  const StoreCard = ({ store }) => {
    return (
        <div className="bans border border-gray-200 rounded-lg shadow-md p-4 m-4 w-60 transition-transform transform hover:scale-105">
        <img
          src={store.URL} // Puedes reemplazar esto con la URL de la imagen de la tienda
          alt={store.name}
          className="rounded-t-lg w-full h-32 object-cover mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-800">{store.name}</h2>
        <p className="text-gray-600">Address: {store.address}</p>
        <p className="text-gray-600">Phone: {store.phone}</p>
      </div>
    );
  };

function TiendasPage() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-wrap justify-center">
      {TiendasPlaces.map(store => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
    <Footer/>
    </>
  )
}

export default TiendasPage