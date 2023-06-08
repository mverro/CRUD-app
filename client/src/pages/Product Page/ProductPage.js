import React, { useState, useEffect } from "react";
import ModalAdd from "../../components/modalAdd";
import LoadingPage from "../../components/loadingPage";
import Button from "../../components/button";
import Pagination from "../../components/paginationPage";
import CardProduct from "../../components/card";
import SearchBar from "../../components/searchBar";
import ModalEdit from "../../components/modalEdit";
import kosongGif from "../../assets/kotak.gif";
import LottiePlayer from "react-lottie-player";
import emptyAnimation from '../../assets/kosong.json';

import {
  getProductPagination,
  searchProduct,
  updateProduct,
  deleteProduct,
} from "../../fetch/product";

const ProductPage = () => {
  const [id, setId] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [changeData, setChangeData] = useState(false);
  const [search, setSearch] = useState("");
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modalCheck, setModalCheck] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const limit = 6;
      await getProductPagination(page, limit, (result) => {
        setProducts(result.products);
        setTotalPages(result.totalPages);
      });

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    await deleteProduct(id, () => setChangeData(!changeData));
  };

  const editHandler = (id) => {
    setId(id);
    setModalCheck(!modalCheck);
    setShowModalEdit(true);
  };

  const handleFilterChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchProduct(search, (result) => {
        setProducts(result);
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, changeData]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAdd = () => {
    setShowModalAdd(true);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <LoadingPage></LoadingPage>
        </div>
      ) : (
        <>
          <ModalAdd
            changeData={changeData}
            setChangeData={setChangeData}
            showModalAdd={showModalAdd}
            setShowModalAdd={setShowModalAdd}
          />
          <ModalEdit
            id={id}
            changeData={changeData}
            setChangeData={setChangeData}
            modalCheck={modalCheck}
            showModalEdit={showModalEdit}
            setShowModalEdit={setShowModalEdit}
          />

          <div className="m-5 border border-gray-300 bg-white rounded-xl">
            <div className="flex flex-wrap justify-between py-5">
              <Button size="medium" text="+ Add" onClick={handleAdd} />
              <SearchBar handleFilterChange={handleFilterChange}></SearchBar>
            </div>
            {products.length > 0 ? (
              <>
                <CardProduct
                  data={products}
                  onDelete={deleteHandler}
                  onEdit={editHandler}
                ></CardProduct>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                ></Pagination>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-8">
                  <LottiePlayer
                    animationData={emptyAnimation}
                    loop
                    autoPlay
                    style={{ width: 350, height: 350 }}
                  />
                </div>
                <p className="text-center text-gray-500 py-10">
                  Tidak ada produk
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
