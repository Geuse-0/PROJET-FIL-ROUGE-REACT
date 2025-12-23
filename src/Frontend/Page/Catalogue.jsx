import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"; 
import { fetchProducts } from "../../Backend/Redux/ProductsSlice";
const Catalogue = () => {
     const dispatch = useDispatch();
    const {items, loading, error} = useSelector(state => state.products);
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);
  if (loading) return <p>Chargement...</p>;
if (error) return <p>{error}</p>;
  if (!items.length) return <p>Aucun produit</p>;
    return (
    <div>znf
{items.map(item => (
    <div key={item.id}>
        <h2>{item.name}</h2>
        <span>{item.price}</span>
    </div>
))}
    </div>
  )
}

export default Catalogue