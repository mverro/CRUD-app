
AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_AWS_REGION'
  });
  
  const s3 = new AWS.S3();
  
  async function deleteFileFromS3(bucketName, key) {
    const params = {
      Bucket: bucketName,
      Key: key
    };
  
    try {
      await s3.deleteObject(params).promise();
      console.log(`File dengan key "${key}" berhasil dihapus dari bucket ${bucketName}`);
    } catch (err) {
      console.log(`Gagal menghapus file dengan key "${key}" dari bucket ${bucketName}`, err);
    }
}


  