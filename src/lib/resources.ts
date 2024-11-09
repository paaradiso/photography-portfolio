import { getStringObject, listObjects } from '$lib/s3';
import { parse } from 'yaml';
import { isImageFile, getFileFolder, getFileName } from '$lib/utils';
import type { FolderMetadata, PhotoMetadata, Photo } from '$lib/types';

export async function getTags(): Promise<string[]> {
	const metadata = await getStringObject('metadata.yaml');
	const tags = (parse(metadata).tags as unknown[]).map(String).sort((a, b) => a.localeCompare(b));
	return tags;
}

async function getFolderMetadata(folder: string): Promise<FolderMetadata> {
	const metadataKey = `${folder}/metadata.yaml`;
	const data = await getStringObject(metadataKey);
	return parse(data) as FolderMetadata;
}

export async function listPhotos(): Promise<Photo[]> {
	const objects = await listObjects();
	const photoKeys = objects
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

	const folders = Array.from(folderMap.keys());
	const folderMetadatas = await Promise.all(folders.map((folder) => getFolderMetadata(folder)));

	const folderMetadataMap = new Map(
		folders.map((folder, index) => [folder, folderMetadatas[index]])
	);

	const photoPromises = Array.from(folderMap.entries()).flatMap(([folder, keys]) => {
		const folderMetadata = folderMetadataMap.get(folder)!;
		return keys.map(async (key) => ({
			key,
			...(await getPhotoMetadata(key, folderMetadata))
		}));
	});

	return Promise.all(photoPromises);
}

export async function getPhotoMetadata(
	key: string,
	folderMetadata?: FolderMetadata
): Promise<PhotoMetadata> {
	const folder = getFileFolder(key);
	const fileName = getFileName(key);

	if (!folderMetadata) {
		folderMetadata = await getFolderMetadata(folder);
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
