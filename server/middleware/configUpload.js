const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMulter = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("image");

let upload = (req, res, next) => {
  uploadMulter(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (!req.file) {
      return next();
    }
    let image = "images/" + req.file.filename;
    req.body.image = image;
    next();
  });
};

module.exports = {
  upload,
};
