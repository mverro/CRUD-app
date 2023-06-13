const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');


AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SCRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
});

const s3 = new AWS.S3();


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read', 
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
}).single('image');

let uploadMulter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (!req.file) {
      return next();
    }
    let image = req.file.location;
    req.body.image = image;
    next();
  });
};



module.exports = uploadMulter;
