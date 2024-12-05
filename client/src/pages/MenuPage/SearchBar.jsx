import { Link } from "react-router-dom";

function SearchBar({ categories }) {
  return (
    <div className="w-1/4 bg-white shadow-md rounded-lg p-4">
      <h2 className="font-bold text-lg mb-4 text-gray-800">Categorías</h2>
      {categories.map((category, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-gray-700">{category.name}</h3>
          <ul className="mt-2">
            {category.products.map((product) => (
              <li key={product.id} className="mb-1">
                <Link
                  to={`/menu/${product.category}/${product.type}`}
                  className="text-blue-600 hover:text-blue-800 transition duration-200 underline"
                >
                  {product.type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;