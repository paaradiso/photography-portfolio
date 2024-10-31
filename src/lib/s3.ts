import { S3Client, GetObjectCommand, ListObjectsCommand, type _Object } from '@aws-sdk/client-s3';
import {
	S3_REGION,
	S3_ENDPOINT,
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET
} from '$env/static/private';

export const s3 = new S3Client({
	endpoint: S3_ENDPOINT,
	region: S3_REGION,
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_SECRET_ACCESS_KEY
	}
});

export async function getObject(key: string) {
	const command = new GetObjectCommand({
		Bucket: S3_BUCKET,
		Key: key
	});
	const response = await s3.send(command);
	return response.Body;
}

export async function getStringObject(key: string): Promise<string> {
	const object = await getObject(key);
	return object.transformToString();
}

export async function listObjects(prefix?: string): Promise<_Object[]> {
	const command = new ListObjectsCommand({
		Bucket: S3_BUCKET,
		Prefix: prefix
	});
	const response = await s3.send(command);
	return response.Contents ?? [];
}
