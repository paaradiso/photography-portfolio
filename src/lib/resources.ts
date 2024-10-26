import { getStringObject, listObjects } from '$lib/s3';
import { parse } from 'yaml';
import { isImageFile, getFileFolder, getFileName } from '$lib/utils';
import type { PhotoEntry, FolderMetadata, PhotoMetadata, Photo } from '$lib/types';

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

	const folderMap = new Map<string, string[]>();
	photoKeys.forEach((key) => {
		const folder = getFileFolder(key);
		if (!folderMap.has(folder)) {
			folderMap.set(folder, []);
		}
		folderMap.get(folder)?.push(key);
	});

	const result: Photo[] = [];
	for (const [folder, keys] of folderMap) {
		const metadataKey = `${folder}/metadata.yaml`;
		const folderMetadata = parse(await getStringObject(metadataKey)) as FolderMetadata;
		for (const key of keys) {
			const metadata = await getPhotoMetadata(key, folderMetadata);
			result.push({ key, ...metadata });
		}
	}
	return result;
}

export async function getPhotoMetadata(
	key: string,
	folderMetadata?: FolderMetadata
): Promise<PhotoMetadata> {
	const folder = getFileFolder(key);
	const fileName = getFileName(key);

	if (!folderMetadata) {
		const metadataKey = `${folder}/metadata.yaml`;
		folderMetadata = parse(await getStringObject(metadataKey)) as FolderMetadata;
	}

	const photoMetadata = folderMetadata.photos?.[fileName];
	const metadataObject: PhotoMetadata = {
		tags: [...folderMetadata.tags, ...(photoMetadata?.tags || [])],
		title: photoMetadata?.title,
		description: photoMetadata?.description,
		folderTitle: folderMetadata.title,
		folderDescription: folderMetadata.description,
		folderDate: folderMetadata.date
	};
	return metadataObject;
}
