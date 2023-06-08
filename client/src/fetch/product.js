import axios from "axios";
import Swal from "sweetalert2";
const URL = "http://localhost:3000/products";

const getProduct = async (cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/",
    });
    cb(result.data);
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  }
};

const getDetail = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/detail/" + id,
    });

    cb(result.data);
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  }
};

const searchProduct = async (data, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + `/search?key=${data}`,
    });
    cb(result.data);
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  }
};

const createProduct = async (data, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "Add the Item?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await axios({
            method: "POST",
            url: URL + "/create",
            data: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error.response.data.message}`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire("Add item", "Item has been added", "success");
        cb();
      }
    });
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  }
};

const updateProduct = async (id, data, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "Update the Item?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await axios({
            method: "PUT",
            url: URL + "/update/" + id,
            data: data,
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error.response.data.message}`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire(
          "Edit item " + id,
          "Item " + id + " has been updated",
          "success"
        );
        cb();
      }
    });
  } catch (err) {
    await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
  }
};

const deleteProduct = async (id, cb) => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete the Item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await axios.delete(URL + "/delete/" + id);
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Swal.fire("Deleted!", "Your file has been deleted.", "success");
        cb();
      }
    });
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  }
};

const getProductPagination = async (page, limit, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + `/pagination?page=${page}&limit=${limit}`,
    });
    console.log(result.data.products);
    cb(result.data);
  } catch (err) {
    await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  }
};

export {
  getProduct,
  getDetail,
  searchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductPagination,
};
