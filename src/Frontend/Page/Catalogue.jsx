import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { fetchProducts } from "../../Backend/Redux/ProductsSlice";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../Backend/Redux/CartSlice";

const Catalogue = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const items = products?.items ?? [];
  const loading = products?.loading ?? false;
  const error = products?.error ?? null;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.categorie.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!items.length) return <p className="text-center mt-10">Aucun produit</p>;

  return (
   <div className="bg-gradient-to-b from-purple-400 to-blue-200 ">
     <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="search"
          placeholder="Rechercher..."
          className="bg-white border border-gray-300 rounded px-4 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="border rounded shadow p-4 flex flex-col justify-between hover:shadow-lg transition-shadow bg-white">
            <img src={item.imageUrl} alt={item.name} />
            <div>
              <Link to={`/product/${item.id}`} className="text-lg font-semibold hover:text-blue-500">
                {item.name}
              </Link>
              <p className="text-gray-700 mt-2">{item.previeDescr}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">{item.price} €</span>
              <button
                className="bg-[#6f64d3] hover:bg-purple-800 text-white px-3 py-1 rounded"
                onClick={() =>
                  dispatch(addToCart({
                    id: item.id,
                    name: item.name,
                    price: Number(item.price)
                  }))
                }
              >
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Catalogue;
