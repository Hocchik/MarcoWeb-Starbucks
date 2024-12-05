import { useState, useEffect } from 'react';
import Footer from "../../Components/Footer"
import Navbar from "../../Components/View/NavBar"
import { Link } from 'react-router-dom';
import CategoriesData from './categories.json';
import SearchBar from './SearchBar';

function MenuPage() {
  
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      setCategories(CategoriesData.categories);
    }, []);  

    return (
    <div className='bg-white'>
    <Navbar/>
    <div className="flex">
      
      <SearchBar categories={categories}/>

     <div className="w-3/4 p-4 text-black">
        <h2 className="font-bold text-lg mb-4">Todos los productos</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.flatMap(category =>
            category.products.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                <img src={product.image} alt={product.type} className="w-full h-32 object-cover mb-2 rounded" />
                <h3 className="font-semibold">{product.type}</h3>
                <p>{product.description}</p>
                <Link to={`/product/${product.id}`} className="text-blue-600 hover:underline">Ver más</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MenuPage