
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
    console.log(req.body, req.files, "===========---------======");
    try {
        const imagesToSave = [];
        // Process each file individually
        for (const file of req.files) {
            console.log(file, "file");
            // Simulate receiving 'originalname' and 'location' from AWS response
            const originalname = file.originalname;
            const location = file.location;

            // Add the image data to the array
            imagesToSave.push({
                originalname,
                location,
            });
        }
        // Save the images to the database
        const uploadDocument = new Upload({
            images: imagesToSave,
            category: req.body.category,
            tags: req.body.tag, // Assuming tags are comma-separated
        });
        const result = await uploadDocument.save()
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
const getImagesByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        let records;
        // If category is provided, retrieve records with that category
        records = await Upload.find({ category: category }).exec();
        console.log("Records:", records);
        if (records.length > 0) {
            res.status(200).send(records);
        } else {
            // If no category is provided, retrieve all records
            records = await Upload.find().exec();
            res.status(200).send(records);
        }

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = {
    getImagesByCategory,
    uploadImageController,
    upload
};