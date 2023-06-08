import React, { useState, useEffect } from 'react';
import { createProduct } from '../fetch/product';

const ModalAdd = ({ showModalAdd, setShowModalAdd, changeData, setChangeData }) => {
  const [form, setForm] = useState({
    name: '',
    buyPrice: '',
    sellPrice: '',
    stock: '',
    image: null,
  });

  const [nameError, setNameError] = useState('');
  const [buyPriceError, setBuyPriceError] = useState('');
  const [sellPriceError, setSellPriceError] = useState('');
  const [stockError, setStockError] = useState('');
  const [imageError, setImageError] = useState('');

  function handleUploadChange(e) {
    let uploaded = e.target.files[0];
    setForm({ ...form, image: uploaded });
  }

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

  const submitHandler = () => {
    if (validateForm()) {
      createProduct(form, () => setChangeData(!changeData));
      console.log(changeData);
      document.body.style.overflow = 'unset';
      setShowModalAdd(false);
    }
  };

  const closeHandle = () => {
    setShowModalAdd(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {showModalAdd ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed pt-20 pb-5 inset-0 z-50 outline-none focus:outline-none">
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
                    <h3 className="text-3xl font-semibold">Add Item</h3>
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
                        placeholder="Input the Product Name"
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
                        placeholder="Input Buy Price Product"
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
                        placeholder="Input Sell Price Product"
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
                        placeholder="Input Stock Product"
                        required
                      />
                      {stockError && (
                        <p className="text-red-500 text-sm mt-1">
                          {stockError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black-500" for="file_input">
                        Upload file
                      </label>
                      <input
                        onChange={handleUploadChange}
                        className="block w-full text-sm text-black-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-[#019267] hover:file:bg-violet-100"
                        id="file_input"
                        type="file"
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
                      Add Item
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

export default ModalAdd;
