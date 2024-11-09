<script lang="ts">
	import FilterAccordion from '$lib/components/FilterAccordion.svelte';
	import WeservImage from '$lib/components/WeservImage.svelte';
	import ImageModal from '$lib/components/ImageModal.svelte';
	import type { Photo } from '$lib/types';

	interface Props {
		data: {
			tags: string[];
			photos: Photo[];
		};
	}

	let { data }: Props = $props();

	let width: number = $state(0) as number;

	let selectedTags: string[] = $state([]);
	let selectedPhoto: Photo | null = $state(null);
	let selectedFolder: string | null = $state(null);

	let isModalOpen = $state(false);

	function openModal(photo: Photo) {
		selectedPhoto = photo;
		isModalOpen = true;
	}

	let filteredPhotos = $derived(
		data.photos.filter((photo) => photo.key.startsWith(selectedFolder ?? ''))
	);

	let selectedFolderPretty: string | null = $derived(
		selectedFolder && filteredPhotos[0].folderTitle
	);
</script>

<FilterAccordion tags={data.tags} bind:selectedTags bind:selectedFolder {selectedFolderPretty} />

{#key filteredPhotos}
	<div class="sm:max-md:columns-1 md:max-lg:columns-2 lg:columns-3 gap-2 w-full mt-4">
		{#each filteredPhotos as photo}
			{#if selectedTags.length === 0 || selectedTags.some((tag) => photo.tags.includes(tag))}
				<button
					onclick={() => {
						openModal(photo);
					}}
					class="w-full min-w-full h-auto"
					bind:clientWidth={width}
				>
					{#if width > 0}
						<WeservImage {photo} class="w-full min-w-full h-auto" {width} />
					{/if}
				</button>
			{/if}
		{/each}
	</div>
{/key}

<ImageModal bind:isOpen={isModalOpen} bind:photo={selectedPhoto} bind:selectedFolder />
