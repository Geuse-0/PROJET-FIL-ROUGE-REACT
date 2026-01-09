import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between bg-white  p-4">
      <h1
        className="text-purple-800 text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        TechZone
      </h1>
      <div className="flex justify-between gap-4">
        <button
          className="text-purple-800"
          onClick={() => navigate("/login")}
        >
          Connexion
        </button>

        <Link
          to="/panier"
          className="text-[#6f64d3] hover:text-purple-800 "
        >
          <ShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default Header;
