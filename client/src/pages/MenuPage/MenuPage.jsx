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

     <div className="w-3/4 p-4 text-black bg-gray-200">
        <h2 className="font-bold text-lg mb-4">Menú</h2>
        {categories.map(category => (
          <div key={category.name}>
            <h3 className="font-bold text-lg mb-2 ml-4 mt-5">{category.name}</h3>
            <div className="flex-grow border-b border-gray-500 ml-4 mb-4"></div>
            
            <div className="grid grid-cols-2 gap-4">
              {category.products.map(product => (
                <div key={product.id} className="border rounded-lg p-4">
                  <Link 
                    to={`/menu/${product.category}/${product.type}`} 
                    className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900"
                  >
                    <img 
                      src={product.image} 
                      alt={product.type} 
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.type}</h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default MenuPage