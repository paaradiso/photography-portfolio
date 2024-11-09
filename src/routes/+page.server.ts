import { getTags, listPhotos } from '$lib/resources';

export async function load() {
	const [tags, photos] = await Promise.all([getTags(), listPhotos()]);
	return {
		tags,
		photos
	};
}
