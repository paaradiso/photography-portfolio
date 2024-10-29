<script lang="ts">
	import type { Photo } from '$lib/types';
	import { X } from 'lucide-svelte';
	import { publicPhotoUrl, getFileFolder } from '$lib/utils';

	interface Props {
		isOpen: boolean;
		photo: Photo | null;
		selectedFolder: string | null;
	}
	let { isOpen = $bindable(), photo = $bindable(), selectedFolder = $bindable() }: Props = $props();

	function closeModal() {
		isOpen = false;
		photo = null;
	}

	function selectFolder() {
		selectedFolder = folder;
		closeModal();
	}

	let publicUrl = $derived(publicPhotoUrl(photo?.key ?? ''));
	let folder = $derived(getFileFolder(photo?.key ?? ''));
</script>

{#if isOpen && photo}
	<div class="fixed top-4 left-4 z-50 text-white flex flex-col gap-1 w-64 text-sm">
		<p>
			{photo.folderTitle}
			{photo.title ? ` - ${photo.title}` : ''}
		</p>
		<p>
			{photo.folderDescription}
			{photo.description ? ` - ${photo.description}` : ''}
		</p>
		<p>
			{photo.folderDate}
		</p>
	</div>

	<button
		onclick={() => selectFolder()}
		class="fixed bottom-4 left-4 z-50 text-white flex flex-col gap-1 text-sm"
	>
		View Collection
	</button>

	<button onclick={() => closeModal()} class="fixed top-4 right-4 z-50">
		<X size="36" color="white" />
	</button>
	<button
		class="cursor-default fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-49 h-screen w-screen"
		onclick={() => closeModal()}
	>
		<img
			src={publicUrl}
			class="max-w-screen max-h-screen p-5 object-contain"
			alt={photo.title || photo.folderTitle}
		/>
	</button>
{/if}
