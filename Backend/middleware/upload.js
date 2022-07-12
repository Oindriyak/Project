const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = {
    userName: 'admin',
    password: 'admin123',
    connectionString: 'cluster0.aw9ku.mongodb.net',
    dbName: 'Todoo',
    port: 80,
	imgBucket: "photos",
	url:''
}
dbConfig.url='mongodb+srv://' + dbConfig.userName + ':' + dbConfig.password + '@' + dbConfig.connectionString + '/' + dbConfig.dbName + '?retryWrites=true&w=majority'


var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
