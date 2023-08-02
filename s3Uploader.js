const AWS = require("aws-sdk");

const s3Uploader = {
  uploadFileToS3: async (bucketNAme, fileName, filePath) => {
    AWS.config.update({
      accessKeyId: process.env.SESSION_ACCESS_KEY,
      secretAccessKey: process.env.SESSION_SECRET_KEY,
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: bucketNAme,
      Key: fileName,
      Body: require("fs").createReadStream(filePath),
    };

    const result = await s3.upload(params).promise();

    return result.Location;
  },
};

module.exports = s3Uploader;
