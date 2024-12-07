import { Link, useParams } from 'react-router-dom';
import CategoriesData from './categories.json';
import Navbar from '../../Components/View/NavBar';
import Footer from '../../Components/Footer';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
      setCategories(CategoriesData.categories);
    }, []);  
  /* console.log(productsData.categories[0].products[0].subtypes) */
    const { type, category } = useParams();
  const product = CategoriesData.categories
    .flatMap(category => category.products)
    .find(product => product.type === type && product.category === category);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="flex">
        <SearchBar categories={categories} />
        <div className="w-3/4 mx-auto p-6 bg-gray-200">
        {/* Breadcrumb */}
        <div className="flex items-center mb-4">
          <Link to='/menu' className="text-gray-500 hover:text-gray-800 cursor-pointer">Menú</Link>
          <span className="mx-2 text-black">/</span>
          <h2 className="font-bold text-lg text-gray-800">{product.type}</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="flex-1">

            {/* Muestra subtipos si existen */}
            {product.subtypes && product.subtypes.length > 0 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {product.subtypes.map(subtype => (
                      <div key={subtype.id} className="w-full max-w-sm bg-white border-gray-200 rounded-lg shadow">
                        <a href="#">
                            <img className="p-8 rounded-t-lg" src={subtype.urlimage} alt="product image" />
                        </a>
                        <div className="px-5 pb-5">
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900">{subtype.name}</h5>
                            </a>
                            <div className="flex items-center justify-between mt-5">
                                <span className="text-3xl font-bold text-gray-900 ">{subtype.price}</span>
                                <Link to={`/menu/${product.category}/${product.type}/${subtype.name}`} className="text-white bg-[#00362E] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#00362E] dark:hover:bg-green-700 dark:focus:ring-green-800">Ver</Link>
                            </div>
                        </div>
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