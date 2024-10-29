<script lang="ts">
	import type { Photo } from '$lib/types';
	import { publicPhotoUrl } from '$lib/utils';

	interface Props {
		photo: Photo;
		class: string;
		width: number;
		floorThreshold?: number;
		quality?: number;
	}

	const { photo, class: htmlClass, width, floorThreshold = 50, quality = 85 }: Props = $props();

	const flooredWidth = $derived(Math.floor(width / floorThreshold) * floorThreshold);

	const publicUrl = publicPhotoUrl(photo.key);
	const weservUrl = $derived(
		`https://wsrv.nl/?url=${encodeURIComponent(publicUrl)}&w=${flooredWidth}&quality=${quality}`
	);
</script>

<img loading="lazy" src={weservUrl} alt={photo.title || photo.folderTitle} class={htmlClass} />
