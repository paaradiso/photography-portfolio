import { getTags, listPhotos } from '$lib/resources';

export async function load() {
	const tags = await getTags();
	const photos = await listPhotos();

	return {
		tags,
		photos
	};
}
