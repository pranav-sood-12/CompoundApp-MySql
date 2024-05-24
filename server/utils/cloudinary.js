import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'deymemxmp', 
    api_key: '923676334379932', 
    api_secret: '2qea6woLltI5QFR5N6-ZBq-a3z4' 
});

const uploadOnCloudinary = async (localFilePath) => {
    // console.log("cloudinary", localFilePath);
    try {
        if (!localFilePath || !localFilePath.tempFilePath) {
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath.tempFilePath, {
            resource_type: "auto"
        });

        // console.log("file is uploaded on cloudinary ", response.url);
        return response;

    } catch (error) {
        console.error('Error uploading to Cloudinary', error); 
        return null;
    }
}

export {uploadOnCloudinary}