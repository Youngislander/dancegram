import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import "./env"

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-northeast-2"
});

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'dancegram',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
})

export const uploadMiddleware = upload.any();

export const uploadController = (req, res) => {
    const {
        files
    } = req;
    res.json({ files });
  console.log(req.files);
};