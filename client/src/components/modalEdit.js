import React, { useState, useEffect } from "react";
import { updateProduct, getDetail } from "../fetch/product";

const ModalEdit = ({
  showModalEdit,
  setShowModalEdit,
  modalCheck,
  id,
  changeData,
  setChangeData,
}) => {
  const [isHandle, setisHandle] = useState(false);
  const [nameError, setNameError] = useState('');
  const [buyPriceError, setBuyPriceError] = useState('');
  const [sellPriceError, setSellPriceError] = useState('');
  const [stockError, setStockError] = useState('');
  const [imageError, setImageError] = useState('');
  const [info, setInfo] = useState({
    name: "",
    buyPrice: 0,
    sellPrice: "",
    stock: "",
    image: null,
  });

  const [form, setForm] = useState({
    name: "",
    buyPrice: 0,
    sellPrice: "",
    stock: "",
    image: null,
  });

  const validateForm = () => {
    let isValid = true;

    if (!form.name || form.name.trim() === '') {
      setNameError('Product name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!form.buyPrice || isNaN(form.buyPrice)) {
      setBuyPriceError('Buy price must be a number');
      isValid = false;
    } else {
      setBuyPriceError('');
    }

    if (!form.sellPrice || isNaN(form.sellPrice)) {
      setSellPriceError('Sell price must be a number');
      isValid = false;
    } else {
      setSellPriceError('');
    }

    if (!form.stock || isNaN(form.stock)) {
      setStockError('Stock must be a number');
      isValid = false;
    } else {
      setStockError('');
    }

    if (form.image) {
      const fileSize = form.image.size / 1024; 
      const fileType = form.image.type;
      const allowedTypes = ['image/jpeg', 'image/png'];

      if (fileSize > 100) {
        setImageError('Image size should not exceed 100KB');
        isValid = false;
      } else if (!allowedTypes.includes(fileType)) {
        setImageError('Only JPEG and PNG images are allowed');
        isValid = false;
      } else {
        setImageError('');
      }
    }

    return isValid;
  };

  const closeHandle = () => {
    setShowModalEdit(false);
    setisHandle(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (showModalEdit) {
      getItemInfo();
      document.body.style.overflow = "hidden";
    }
  }, [modalCheck]);

  const getItemInfo = () => {
    getDetail(+id, (result) => {
      setInfo({
        name: result.name,
        buyPrice: result.buyPrice,
        sellPrice: result.sellPrice,
        stock: result.stock,
        image: result.image,
      });
      setForm({
        name: result.name,
        buyPrice: result.buyPrice,
        sellPrice: result.sellPrice,
        stock: result.stock,
        image: result.image,
      });
    });
  };

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setForm({ ...form, image: uploaded });
    setisHandle(true);
    setInfo({...info,image: URL.createObjectURL(uploaded)});
  }

  const submitHandler = () => {
    if (validateForm()) {
    updateProduct(id, form, () => setChangeData(!changeData));
    document.body.style.overflow = "unset";
    setShowModalEdit(false);
    setisHandle(false);
    }
  };

  return (
    <>
      {showModalEdit ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed pt-20 pb-5 inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <button
                  onClick={() => closeHandle()}
                  type="button"
                  className="absolute top-3 right-2.5 text-black-500 bg-transparent hover:bg-gray-200 hover:text-black-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Edit Item</h3>
                  </div>
                  <form className="space-y-6" action="#">
                    <div className="mt-5">
                      <label className="block mb-2 text-sm font-medium text-black-500">
                        Product Name
                      </label>
                      <input
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.name}
                        required
                      />
                      {nameError && (
                        <p className="text-red-500 text-sm mt-1">{nameError}</p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black-500">
                        Buy Price
                      </label>
                      <input
                        onChange={(e) =>
                          setForm({ ...form, buyPrice: e.target.value })
                        }
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.buyPrice}
                        required
                      />
                      {buyPriceError && (
                        <p className="text-red-500 text-sm mt-1">
                          {buyPriceError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black-500">
                        Sell Price
                      </label>
                      <input
                        onChange={(e) =>
                          setForm({ ...form, sellPrice: e.target.value })
                        }
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.sellPrice}
                        required
                      />
                      {sellPriceError && (
                        <p className="text-red-500 text-sm mt-1">
                          {sellPriceError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black-500">
                        Stock
                      </label>
                      <input
                        onChange={(e) =>
                          setForm({ ...form, stock: e.target.value })
                        }
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-black-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        value={form.stock}
                        required
                      />
                      {stockError && (
                        <p className="text-red-500 text-sm mt-1">
                          {stockError}
                        </p>
                      )}
                    </div>
                    <div className="overflow-clip w-full pl-5">
                        <div className="mb-2">
                          {isHandle ? (
                            <img
                              src={info.image}
                              className="img-thumbnail h-50 w-50 object-cover  m-auto"
                              alt="Photo"
                              width="300px"
                            />
                          ) : (
                            <img
                              src={`https://crud-app-omega-five.vercel.app/${info.image}`}
                              className="img-thumbnail h-50 w-50 object-cover  m-auto"
                              alt="Photo"
                              width="300px"
                            />
                          )}
                        </div>
                        <input
                          onChange={handleUploadChange}
                          className="form-control"
                          type="file"
                          id="formFile"
                        />
                        {imageError && (
                        <p className="text-red-500 text-sm mt-1">
                          {imageError}
                        </p>
                      )}
                      </div>
                    <button
                      onClick={() => submitHandler()}
                      type="submit"
                      className="w-full text-white bg-[#019267] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Edit Item
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-30 fixed inset-0 z-40 bg-black"></div>





          
        </>
      ) : null}
    </>
  );
};

export default ModalEdit;
