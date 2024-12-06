import { Link } from "react-router-dom";

function SearchBar({ categories }) {
  return (
    <div className="w-1/4 bg-white shadow-md -lg p-6">
      <div className="ml-20">
      {categories.map((category, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-semibold text-gray-700 text-lg">{category.name}</h3>
          <ul className="mt-2">
            {category.products.map((product) => (
              <li key={product.id} className="mb-2">
                <Link
                  to={`/menu/${product.category}/${product.type}`}
                  className="text-gray-600 hover:text-gray-900 transition duration-200 text-sm font-medium"
                >
                  {product.type}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}

export default SearchBar;