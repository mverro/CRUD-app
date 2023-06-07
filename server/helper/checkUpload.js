const fs = require("fs");

const checkUpload = (tempImage, imageUrl) => {
    if (tempImage !== imageUrl) {
      let fileName = tempImage;
      fs.unlinkSync(`./public/${fileName}`);
    }
  
  }

  module.exports = {checkUpload}