<script lang="ts">
	import type { Photo } from '$lib/types';
	import { publicPhotoUrl } from '$lib/utils';

	interface Props {
		photo: Photo;
		class: string;
		width: number;
		floorThreshold?: number;
	}

	const { photo, class: htmlClass, width, floorThreshold = 100 }: Props = $props();

	const IMAGE_QUALITY = 90;

	const flooredWidth = $derived(Math.floor(width / floorThreshold) * floorThreshold);

	const publicUrl = publicPhotoUrl(photo.key);
	const weservUrl = $derived(
		`https://wsrv.nl/?url=${encodeURIComponent(publicUrl)}&w=${flooredWidth}&quality=${IMAGE_QUALITY}`
	);
</script>

<img loading="lazy" src={weservUrl} alt={photo.title || photo.folderTitle} class={htmlClass} />
