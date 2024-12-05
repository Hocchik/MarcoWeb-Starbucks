import { useParams } from 'react-router-dom';
import productsData from './categories.json';
import Navbar from '../../Components/View/NavBar';
import Footer from '../../Components/Footer';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/ClientContext';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const {products, getProductos} = useAuth();
console.log(products)

    useEffect(() => {
      setCategories(productsData.categories);
      getProductos();
    }, []);  
  /* console.log(productsData.categories[0].products[0].subtypes) */

 

  
    const { type, category } = useParams();
    console.log(type)
  const product = productsData.categories
    .flatMap(category => category.products)
    .find(product => product.type === type && product.category === category);

  /* if (!product) {
    return <div>Producto no encontrado</div>;
  } */

  

  return (
    <>
    <Navbar/>
    <div className="flex">
        <SearchBar categories={categories} />
        <div className="max-w-6xl mx-auto p-6 bg-gray-100">
        {/* Breadcrumb */}
        <div className="flex items-center mb-4">
          <span className="text-gray-500 hover:text-gray-800 cursor-pointer">Menú</span>
          <span className="mx-2">/</span>
          <h2 className="font-bold text-lg text-gray-800">{product.type} ®</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1 md:mr-6 mb-6">
            <img src={product.image} alt={product.type} className="w-full h-72 object-cover rounded-lg shadow-md" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-2xl text-gray-800 mb-2">{product.type}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Muestra subtipos si existen */}
            {product.subtypes && product.subtypes.length > 0 && (
              <div>
                <h3 className="font-bold text-lg text-gray-800 mt-6">Tipos de {product.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {product.subtypes.map(subtype => (
                    <div key={subtype.id} className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition duration-200">
                      <img src={subtype.urlimage} alt={subtype.name} className="w-full h-32 object-cover mb-2 rounded" />
                      <h4 className="font-semibold text-gray-800">{subtype.name}</h4>
                      <p className="text-gray-500">{subtype.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>

    </>
  );
};

export default ProductPage;