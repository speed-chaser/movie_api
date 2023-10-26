const AWS = require("aws-sdk");

/**
 * Object that contains methods related to uploading files to AWS S3.
 * @namespace s3Uploader
 */
const s3Uploader = {
  /**
   * Asynchronously uploads a file to an S3 bucket.
   *
   * @async
   * @function
   * @memberof s3Uploader
   * @param {string} bucketName - The name of the bucket where the file will be uploaded.
   * @param {string} fileName - The name that the uploaded file will have.
   * @param {string} filePath - The local path where the file to be uploaded is located.
   * @returns {Promise<string>} - A promise that resolves with the URL where the file is accessible.
   */
  uploadFileToS3: async (bucketName, fileName, filePath) => {
    // Updating AWS configuration with access and secret keys from environment variables.
    AWS.config.update({
      accessKeyId: process.env.SESSION_ACCESS_KEY,
      secretAccessKey: process.env.SESSION_SECRET_KEY,
    });

    const s3 = new AWS.S3();

    // Parameters for the S3 upload function, including bucket name, file name, and file content.
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: require("fs").createReadStream(filePath),
    };

    // Uploading the file to S3 and waiting for the result.
    const result = await s3.upload(params).promise();

    // Returning the URL where the uploaded file can be accessed.
    return result.Location;
  },
};

module.exports = s3Uploader;
