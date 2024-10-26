<script lang="ts">
	import '../app.css';
	import '@fontsource/eb-garamond';

	import urlJoin from 'url-join';
	import { PUBLIC_IMAGE_BASE_URL, PUBLIC_LOGO_FILE_NAME } from '$env/static/public';

	const logoUrl = urlJoin(PUBLIC_IMAGE_BASE_URL, PUBLIC_LOGO_FILE_NAME);

	let { children } = $props();
</script>

<div class="container flex flex-col justify-center items-center my-16 max-w-[42rem]">
	<img src={logoUrl} alt="logo" class="h-8" />
	{@render children()}
</div>
