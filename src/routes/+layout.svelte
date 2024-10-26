<script lang="ts">
	import '../app.css';
	import '@fontsource/eb-garamond';

	let { children } = $props();
</script>

<div class="container flex flex-col justify-center items-center my-16 max-w-[42rem]">
	<img src="/logo-main.svg" alt="logo" class="h-8" />
	{@render children()}
</div>
