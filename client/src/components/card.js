import React from "react";
import { format } from "date-fns";
import formatCurrency from "../helper/currencyFormater";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import capitalize from "../helper/textFormater";

const CardProduct = ({ data, onDelete, onEdit }) => {
  const handleDelete = (productId) => {
    onDelete(productId);
  };

  const handleEdit = (productId) => {
    onEdit(productId);
  };

  return (
    <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
      {data &&
        data.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md w-full hover:scale-95 transition-all duration-150 relative mb-5"
          >
            <div className="relative mx-4 -mt-6 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
              <p className="absolute top-0 right-0 m-2 text-sm bg-yellow-500 opacity-90 px-2 py-1 rounded-lg">
                Stock {product.stock}
              </p>
              <img
                src={`https://crud-app-omega-five.vercel.app/${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover bg-white"
              />
            </div>

            <div className="mt-6  ml-6 ">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="font-medium text-slate-900">Nama Produk</td>
                    <td>:</td>
                    <td className="text-base">{capitalize(product.name)}</td>
                  </tr>
                  <tr>
                    <td className="font-medium text-slate-900">Harga Beli</td>
                    <td>:</td>
                    <td className="text-base">
                      {formatCurrency(product.buyPrice)}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium text-slate-900">Harga Jual</td>
                    <td>:</td>
                    <td className="text-base">
                      {formatCurrency(product.sellPrice)}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="h-10 px-3 sm:px-5 font-semibold rounded-full bg-green-600 text-white mt-3"
                      >
                        <div className="flex items-center">
                          <RiEdit2Line />
                          <p className="ml-2">Edit</p>
                        </div>
                      </button>
                    </td>
                    <td></td>
                    <td>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="h-10 px-3 sm:px-5 font-semibold rounded-full border border-slate-200 bg-red-600 text-white mt-3"
                      >
                        <div className="flex items-center">
                          <RiDeleteBin2Line />
                          <p className="ml-2">Delete</p>
                        </div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 pt-0">
              <div className="mt-3">
                <p className="text-sm text-slate-500">
                  Created :{" "}
                  {format(
                    new Date(product.createdAt),
                    "dd MMMM yyyy, HH:mm:ss"
                  )}
                </p>
                <p className="text-sm text-slate-500">
                  Updated :{" "}
                  {format(
                    new Date(product.updatedAt),
                    "dd MMMM yyyy, HH:mm:ss"
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardProduct;
