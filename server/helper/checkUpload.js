const fs = require("fs");

const checkUpload = (tempImage, imageUrl) => {
  if (tempImage !== imageUrl) {
    let fileName = tempImage;
    fs.unlinkSync(`./public/${fileName}`);
  }
};

const checkFileDelete = (data) => {
  if (data) {
    let fileName = data.dataValues.image;
    if (fileName) {
      fs.unlinkSync(`./public/${fileName}`);
    }
  }
};

const deleteFile = (fileName) => {
  
      fs.unlinkSync(`./public/${fileName}`);
    
  
};

module.exports = { checkUpload,checkFileDelete ,deleteFile};
