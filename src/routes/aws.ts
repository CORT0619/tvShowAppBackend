import { PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import logger from '../logger';

const client = new S3Client({});

export async function uploadUserPhoto(s3bucket: string) { // TODO: need to create an s3 bucket, should return an identifier for the db
	const put = new PutObjectCommand({
		Bucket: s3bucket,
		Key: '', // should be associated with the user, need to return something to insert in the database
		Body: '' // the image
	});
	try {
		const uploadResponse = await client.send(put);
		console.log('uploadResponse ', uploadResponse);
	} catch (error) {
		logger.log('error', error.message);
		return 'An error has occurred uploading the photo to the s3 bucket.';
	}
}