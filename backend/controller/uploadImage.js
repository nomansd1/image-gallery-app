
const multer = require('multer');
const Upload = require('../models/images')
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
            if (res) {
                // File uploaded successfully
                const imageUrl = req.file
                const data = {
                    originalname: imageUrl.originalname,
                    location: imageUrl.location,
                }
                const uploadDocument = new Upload({
                    images: [data],
                    category: req.body.category,
                    tags: [req.body.tag],
                });
                // Save the document to the database
                const savedDocument = await uploadDocument.save();
                res.status(200).send(savedDocument)
            }
        } else {
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