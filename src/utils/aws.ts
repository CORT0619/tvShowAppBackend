import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({});

export async function uploadUserPhoto(
  s3bucket: string,
  imageName: string,
  image: string, // TODO: change this
) {
  // TODO: need to create an s3 bucket, should return an url for the photo to insert into the db
  const put = new PutObjectCommand({
    Bucket: s3bucket,
    Key: imageName, // should be associated with the user, need to return something to insert in the database
    Body: image, // the image
  });

  try {
    const uploadResponse = await client.send(put);
    console.log('uploadResponse ', uploadResponse);
    return uploadResponse;
  } catch (error) {
    throw new Error(
      'An error has occurred uploading the photo to the s3 bucket. ' +
        JSON.stringify(error),
    );
  }
}
