import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct, deleteProduct, addProduct } from "../../Backend/Redux/ProductsSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Admin = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">Chargement...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!items.length) return <p className="text-center mt-10">Aucun produit</p>;

  const initialValues = editingProduct || {
    name: "",
    price: "",
    description: "",
    quantity: "",
    image: "",
    categorie: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nom requis"),
    price: Yup.number().positive("Doit être positif").required("Prix requis"),
    description: Yup.string().required("Description requise"),
    quantity: Yup.number().integer("Doit être un entier").min(0, "Minimum 0").required("Stock requis"),
    categorie: Yup.string().required("Catégorie requise")
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, ...values }));
      setEditingProduct(null);
    } else {
      dispatch(addProduct(values));
    }
    resetForm();
  };

  return (
    <div className="bg-gradient-to-t from-purple-400 to-blue-200 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>

        <div className="bg-white p-6 rounded shadow mb-8">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Nom</label>
                  <Field name="name" type="text" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Prix</label>
                  <Field name="price" type="number" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm"/>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="mb-1 font-semibold">Description</label>
                  <Field name="description" type="text" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm"/>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Stock</label>
                  <Field name="quantity" type="number" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm"/>
                </div>

                <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Catégorie</label>
                  <Field name="categorie" type="text" className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <ErrorMessage name="categorie" component="div" className="text-red-500 text-sm"/>
                </div>


                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#6f64d3] hover:bg-purple-800 text-white px-4 py-2 rounded mt-2 md:col-span-2"
                >
                  {editingProduct ? "Mettre à jour" : "Ajouter Produit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <h3 className="text-xl font-bold mb-4">Liste des Produits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-gray-700">{product.description}</p>
                <p className="font-bold mt-2">{product.price} €</p>
                <p className="text-gray-500 text-sm">Stock: {product.quantity}</p>
                <p className="text-gray-500 text-sm">Catégorie: {product.categorie}</p>
              </div>
              <div className="mt-4 flex justify-between">
                <button 
                  className="bg-[#6f64d3] hover:bg-purple-800 text-white px-3 py-1 rounded"
                  onClick={() => setEditingProduct(product)}
                >
                  Modifier
                </button>
                <button 
                  className="bg-[#d36464] hover:bg-red-700 text-white px-3 py-1 rounded"
                  onClick={() => dispatch(deleteProduct(product.id))}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
