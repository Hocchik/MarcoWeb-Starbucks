import { Link, useParams } from 'react-router-dom';
import CategoriesData from './categories.json';
import Navbar from '../../Components/View/NavBar';
import Footer from '../../Components/Footer';

const ProductDetailPage = () => {
    const { category, type, name } = useParams();

    const product = CategoriesData.categories
        .flatMap(cat => cat.products)
        .find(prod => prod.type === type && prod.category === category);

    const selectedSubtype = product?.subtypes.find(sub => sub.name === name);

    if (!selectedSubtype) {
        return <div className="text-center text-gray-700">Producto no encontrado</div>;
    }

    return (
        <>
            <Navbar />
            <div className='bg-gray-200 '>
            <div className=" text-white">
                <div className="">
                    {/* Breadcrumb */}
                    <div className="flex items-center mb-4 p-4">
                      <Link to={'/menu'} className="text-gray-500 hover:text-gray-800 cursor-pointer">Menú</Link>
                      <span className="mx-2 text-black">/</span>
                      <Link to={`/menu/${product.category}/${product.type}`} className="text-gray-500 hover:text-gray-800 cursor-pointer">{product.type}</Link>
                      <span className="mx-2 text-black">/</span>
                      <h2 className="font-bold text-lg text-gray-800">{selectedSubtype.name}</h2>
                    </div>

                    <div className='bg-[#00362E] p-10 grid grid-cols-3'>

                        <div className='w-2/3'>
                        <img
                            src={selectedSubtype.urlimage}
                            alt={selectedSubtype.name}
                            className="rounded-lg ml-24 h-auto object-cover"
                        />
                        </div>

                        <div className='w-3/4'>
                        <h2 className="text-3xl mt-6 font-bold mb-2">{selectedSubtype.name}</h2>
                        <p className="mt-4 text-xl text-gray-300 font-bold">{selectedSubtype.description}</p>
                        <p className="text-2xl font-semibold mt-4">{selectedSubtype.price}</p>
                        </div>

                        <div className='w-96'>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white">Elige el tamaño de tu bebida</h3>
                            <div className="border-t border-gray-300 my-2"></div>
                            <div className="flex justify-between mt-4">
                                <div className="text-center">
                                    <button className="border border-green-500 rounded-full p-4 flex flex-col items-center transition duration-200 hover:bg-green-100">
                                        <img src="https://www.starbucks.pe/icons/Desktop/Cup/Alto-active.svg" alt="Alto" className="mb-2" />
                                        <span className="font-bold">Alto</span>
                                        <span className="text-gray-200">300 ml</span>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button className="border border-gray-300 rounded-full p-4 flex flex-col items-center transition duration-200 hover:bg-gray-100">
                                        <img src="https://www.starbucks.pe/icons/Desktop/Cup/Grande.svg" alt="Grande" className="mb-2" />
                                        <span className="font-bold">Grande</span>
                                        <span className="text-gray-200">400 ml</span>
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button className="border border-gray-300 rounded-full p-4 flex flex-col items-center transition duration-200 hover:bg-gray-100">
                                        <img src="https://www.starbucks.pe/icons/Desktop/Cup/Venti.svg" alt="Venti" className="mb-2" />
                                        <span className="font-bold">Venti</span>
                                        <span className="text-gray-200">500 ml</span>
                                    </button>
                                </div>
                            </div>
                            {/* <p className="mt-4 text-xl font-semibold text-green-600">${16.50}</p> */}
                        </div>
                        </div>


                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetailPage;