import React from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import image from "../assets/barang.gif";

const Homepage = () => {
  const [showBanner, setShowBanner] = React.useState(false);

  React.useEffect(() => {
    setShowBanner(true);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <CSSTransition
        in={showBanner}
        timeout={500}
        classNames="banner"
        unmountOnExit
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <img className="w-48 h-48" src={image} alt="GIF" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-8">
            Selamat Datang di Halaman Beranda
          </h1>
          <p className="text-lg text-gray-300 mb-12">
            Temukan produk terbaik untukmu
          </p>
          <Link
            to="/product"
            className="px-8 py-3 bg-green-500 text-white text-lg rounded-full transition duration-300 ease-in-out hover:bg-green-600"
          >
            Lihat Produk
          </Link>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Homepage;
