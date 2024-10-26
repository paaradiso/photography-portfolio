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

	let width: number = $state(0) as number;

	let selectedTags: string[] = $state([]);
	let selectedPhoto: Photo | null = $state(null);

	let isModalOpen = $state(false);

	function openModal(photo: Photo) {
		selectedPhoto = photo;
		isModalOpen = true;
	}

	let { data }: Props = $props();
</script>

<TagAccordion tags={data.tags} bind:selectedTags />

<div class="flex flex-col gap-2 justify-center items-center w-full mt-4" bind:clientWidth={width}>
	{#each data.photos as photo}
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
	{/each}
</div>

<ImageModal bind:isOpen={isModalOpen} bind:photo={selectedPhoto} />
