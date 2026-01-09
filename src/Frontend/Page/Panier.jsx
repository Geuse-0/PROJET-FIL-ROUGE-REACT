import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  getCart
} from "../../Backend/Redux/CartSlice";
import { useEffect, useState } from "react";

const Panier = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-gradient-to-t text-xl font-semibold text-white from-purple-400 to-blue-200 min-h-screen flex items-center justify-center">
       
          Votre panier est vide
        
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-400 to-blue-200 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-purple-800 text-2xl font-bold mb-6 text-center">Votre Panier</h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-lg transition-shadow"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price} €</p>
              </div>

            <div className="flex items-center gap-3 mt-4 sm:mt-0">
  <button
    onClick={() =>
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1
        })
      )
    }
    disabled={item.quantity <= 1}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    -
  </button>

  <span className="font-semibold">{item.quantity}</span>

  <button
    onClick={() =>
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity + 1
        })
      )
    }
    disabled={item.quantity >= item.stock}
    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
  >
    +
  </button>

  <button
    onClick={() => dispatch(removeFromCart(item.id))}
    className="bg-[#d36464] hover:bg-red-700 text-white px-3 py-1 rounded"
  >
    Supprimer
  </button>
</div>
            </div>
          ))}
        </div>

        <div className="bg-white mt-8 p-6 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold">
              {total.toFixed(2)} €
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded w-full"
            >
              Vider le panier
            </button>

            <button
              onClick={() => {
                alert("Commande validée");
                dispatch(clearCart());
              }}
              className="bg-purple-500 hover:bg-purple-800 text-white px-4 py-2 rounded w-full"
            >
              Valider la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panier;
