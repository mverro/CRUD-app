const { product } = require("../models");
const { checkUpload, checkFileDelete,deleteFile } = require("../helper/checkUpload");
const { Op } = require("sequelize");
const { tokenGenerator, tokenVerifier } = require("../helper/jwtConfig");

class ProductController {
  static async getProduct(req, res) {
    try {
      let result = await product.findAll({
        order: [["id", "asc"]],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = +req.params.id;
      const temp = await product.findByPk(id);
      // checkFileDelete(temp);
      let result = await product.destroy({
        where: { id: id },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been Deleted!`,
          })
        : res.status(404).json({
            message: `id ${id} not found!'`,
          });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { name, buyPrice, sellPrice, stock, image } = req.body;
      const existingProduct = await product.findOne({
        where: { name: { [Op.iLike]: name } },
      });

      if (existingProduct) {
        // deleteFile(image)
        return res.status(400).json({ message: "Product name already exists" });
      }

      const newProduct = await product.create({
        name: name,
        buyPrice: +buyPrice,
        sellPrice: +sellPrice,
        stock: +stock,
        image: image || 'images/placeholder.png',
      });

      res.status(201).json({ result: newProduct });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const { name, buyPrice, sellPrice, stock, image } = req.body;
      const temp = await product.findByPk(id);
      const tempImage = temp.image;

      const result = await product.update(
        {
          name: name,
          buyPrice: buyPrice,
          sellPrice: sellPrice,
          stock: stock,
          image: image,
        },
        { where: { id } }
      );
      // checkUpload(tempImage, image);
      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been Updated!`,
          })
        : res.status(404).json({
            message: `Couldn't Update id:${id}.'`,
          });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async search(req, res) {
    try {
      const searchQuery = req.query.key;
      const results = await product.findAll({
        order: [["id", "ASC"]],
        where: {
          name: { [Op.iLike]: `%${searchQuery}%` },
        },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async detail(req, res) {
    try {
      const id = req.params.id;
      const result = await product.findByPk(id);

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getProductsPagination(req, res) {
    const { page, limit } = req.query;
    const offset = (+page - 1) * +limit;
    

    try {
      const products = await product.findAll({
        offset,
        limit: +limit,
        order: [["id", "ASC"]],
      });

      const totalProducts = await product.count();
      const totalPages = Math.ceil(totalProducts / limit);

      res.json({
        products,
        totalProducts,
        totalPages,
        currentPage: +page,
      });
    } catch (err) {
      res.status(500).json({ err: "Internal server error" });
    }
  }
}

module.exports = ProductController;
