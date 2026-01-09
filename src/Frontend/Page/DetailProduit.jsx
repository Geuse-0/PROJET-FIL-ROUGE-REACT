import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../Backend/Redux/ProductsSlice";
import { addToCart } from "../../Backend/Redux/CartSlice";

const DetailProduit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const produit = items.find((product) => String(product.id) === String(id));

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!produit) return <p className="text-center mt-10">Produit introuvable</p>;

  return (
    <div className="bg-gradient-to-t from-purple-400 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-3xl  mx-auto bg-white rounded shadow mt-10">
        <h2 className="text-2xl font-bold mb-4">{produit.name}</h2>
        <p className="text-gray-700 mb-2">{produit.description}</p>
        <p className="font-semibold mb-2">Prix : {produit.price} €</p>
        <p className="text-gray-500 mb-4">Stock disponible : {produit.quantity}</p>
        <button className="bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded transition-colors"
          onClick={() =>
            dispatch( addToCart({id: produit.id,   name: produit.name,   price: Number(produit.price),
              }))}>
                 Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default DetailProduit;
