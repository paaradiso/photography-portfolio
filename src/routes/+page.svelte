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

	let smWidth: number = $state(0) as number;
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
	$inspect(selectedFolderPretty);

	let columns = $derived([
		filteredPhotos.filter((_, i) => i % 3 === 0),
		filteredPhotos.filter((_, i) => i % 3 === 1),
		filteredPhotos.filter((_, i) => i % 3 === 2)
	]);
</script>

<FilterAccordion tags={data.tags} bind:selectedTags bind:selectedFolder {selectedFolderPretty} />

{#snippet photoSnippet(photo, width)}
	{#if selectedTags.length === 0 || selectedTags.some((tag) => photo.tags.includes(tag))}
		<button
			onclick={() => {
				openModal(photo);
			}}
			class="w-full min-w-full h-auto"
		>
			<WeservImage {photo} class="w-full min-w-full h-auto" {width} />
		</button>
	{/if}
{/snippet}

{#key filteredPhotos}
	<div
		class="sm:hidden flex flex-col gap-2 justify-center items-center w-full mt-4"
		bind:clientWidth={smWidth}
	>
		{#each filteredPhotos as photo}
			{@render photoSnippet(photo, smWidth)}
		{/each}
	</div>
{/key}

{#key columns}
	<div class="hidden sm:visible sm:flex gap-2 w-full mt-4" bind:clientWidth={width}>
		{#each columns as column}
			<div class="flex flex-col gap-2">
				{#each column as photo}
					{@render photoSnippet(photo, width)}
				{/each}
			</div>
		{/each}
	</div>
{/key}

<ImageModal bind:isOpen={isModalOpen} bind:photo={selectedPhoto} bind:selectedFolder />
