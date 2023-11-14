
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const s3 = require('../util/s3.util');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});
const uploadImageController = async (req, res) => {
    try {
        if (req.file) {
            console.log(req.file, "req.file=============");
            // File uploaded successfully
            res.json({ imageUrl: req.file });
        } else {
            // Error uploading file
            res.status(500).json({ error: 'Error uploading file' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
module.exports = {
    uploadImageController,
    upload
};