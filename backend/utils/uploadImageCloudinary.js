// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dvxceod63",
    api_key: "836317862267872",
    api_secret: "mgPsLSLqIvtxpjDFobkGiRuStsk"
});

const uploadImageCloudinary = async (image) => {
    try {
        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "binkeyit" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        return uploadResult;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};

export default uploadImageCloudinary;

