const fs = require("fs");
const AWS = require('aws-sdk');


const checkUpload = (tempImage, imageUrl) => {
  if (tempImage !== imageUrl) {
    let fileName = tempImage;
    fs.unlinkSync(`./public/${fileName}`);
  }
};

function getKeyFromUrl(url) {
  const regex = /^https?:\/\/([^/]+)\/(.+)$/;
  const matches = url.match(regex);
  if (matches && matches.length === 3) {
    const bucket = matches[1];
    const key = matches[2];
    return `s3://${bucket}/${key}`;
  }
  return null;
}


const checkFileDelete = async (data) => {
  if (data) {
    let fileName = data.dataValues.image;
    const key = getKeyFromUrl(fileName);
    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    };
    await s3.deleteObject(params).promise();
  }
};


const deleteFile = (fileName) => {
  
      fs.unlinkSync(`./public/${fileName}`);
    
  
};

module.exports = { checkUpload,checkFileDelete ,deleteFile};
