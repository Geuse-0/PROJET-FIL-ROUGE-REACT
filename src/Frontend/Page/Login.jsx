import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../Backend/Redux/AuthSlice";
import { useNavigate } from "react-router-dom";
import API from "../../Backend/API";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalide").required("Requis"),
    password: Yup.string().required("Requis"),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await API.get("/users");
      const user = res.data.find(
        (u) => u.email === values.email && u.password === values.password
      );
      if (user) {
        dispatch(login({ user: { id: user.id, email: user.email }, token: "fakeToken123" }));
        navigate("/admin");
      } else {
        setErrors({ password: "Email ou mot de passe incorrect" });
      }
    } catch (err) {
      setErrors({ password: "Erreur serveur" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-purple-500 to-blue-200 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion Admin</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Mot de passe</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6f64d3] hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded mt-2"
              >
                Se connecter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
