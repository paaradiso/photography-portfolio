<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';

	interface Props {
		tags: string[];
		selectedTags: string[];
	}

	const { tags, selectedTags = $bindable() }: Props = $props();

	function clickTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags.splice(selectedTags.indexOf(tag), 1);
		} else {
			selectedTags.push(tag);
		}
	}
</script>

<Accordion.Root class="w-full">
	<Accordion.Item value="tags">
		<Accordion.Trigger>tags</Accordion.Trigger>
		<Accordion.Content>
			<div class="flex gap-2 flex-wrap">
				{#each tags as tag}
					<button
						class="{selectedTags.includes(tag)
							? 'bg-neutral-200'
							: 'bg-white'} rounded-md px-1 py-1/2"
						onclick={() => clickTag(tag)}
						aria-label="Select tag {tag}">{tag}</button
					>
				{/each}
			</div>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
