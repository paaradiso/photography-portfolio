<script lang="ts">
	import TagAccordion from '$lib/components/TagAccordion.svelte';
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

	$inspect(smWidth, width);

	let selectedTags: string[] = $state([]);
	let selectedPhoto: Photo | null = $state(null);

	let isModalOpen = $state(false);

	function openModal(photo: Photo) {
		selectedPhoto = photo;
		isModalOpen = true;
	}

	const columns = [
		data.photos.filter((_, i) => i % 3 === 0),
		data.photos.filter((_, i) => i % 3 === 1),
		data.photos.filter((_, i) => i % 3 === 2)
	];
</script>

<TagAccordion tags={data.tags} bind:selectedTags />

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

<div
	class="sm:hidden flex flex-col gap-2 justify-center items-center w-full mt-4"
	bind:clientWidth={smWidth}
>
	{#each data.photos as photo}
		{@render photoSnippet(photo, smWidth)}
	{/each}
</div>

<div class="hidden sm:visible sm:flex gap-2 w-full mt-4" bind:clientWidth={width}>
	{#each columns as column}
		<div class="flex flex-col gap-2">
			{#each column as photo}
				{@render photoSnippet(photo, width)}
			{/each}
		</div>
	{/each}
</div>

<ImageModal bind:isOpen={isModalOpen} bind:photo={selectedPhoto} />
