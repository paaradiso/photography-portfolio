import { getStringObject, listObjects } from '$lib/s3';
import { parse } from 'yaml';
import { isImageFile, getFileFolder, getFileName } from '$lib/utils';
import type { Photo, PhotoMetadata } from '$lib/types';

export async function getTags(file: string = 'metadata.yaml'): Promise<string[]> {
	const metadata = await getStringObject(file);

	const tags = (parse(metadata).tags as unknown[])
		.map((tag) => String(tag))
		.sort((a, b) => a.localeCompare(b));

	return tags;
}

export async function listPhotos(): Promise<Photo[]> {
	const photos = await listObjects();

	const photoKeys = photos
		.map((photo) => photo.Key)
		.filter((key): key is string => key !== undefined && isImageFile(key));

	const photosWithMetadata = await Promise.all(
		photoKeys.map(async (key) => {
			const metadata = await getPhotoMetadata(key);
			return { key, ...metadata } as Photo;
		})
	);

	return photosWithMetadata;
}

export async function getPhotoMetadata(key: string): Promise<PhotoMetadata> {
	const folder = getFileFolder(key);
	const fileName = getFileName(key);
	const metadataKey = `${folder}/metadata.yaml`;

	const metadata = parse(await getStringObject(metadataKey));
	const photoMetadata = metadata.photos?.[fileName];

	const metadataObject: PhotoMetadata = {
		tags: [...metadata.tags, ...(photoMetadata?.tags || [])],
		title: photoMetadata?.title,
		description: photoMetadata?.description,
		folderTitle: metadata.title,
		folderDescription: metadata.description,
		folderDate: metadata.date
	};

	return metadataObject;
}
