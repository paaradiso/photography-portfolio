<script lang="ts">
	import '../app.css';
	import '@fontsource/eb-garamond';
	import GoogleAnalytics from '$lib/components/GoogleAnalytics.svelte';
	import {
		PUBLIC_IMAGE_BASE_URL,
		PUBLIC_LOGO_FILE_NAME,
		PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
		PUBLIC_DOCUMENT_TITLE,
		PUBLIC_META_DESCRIPTION
	} from '$env/static/public';
	import urlJoin from 'url-join';

	const logoUrl = urlJoin(PUBLIC_IMAGE_BASE_URL, PUBLIC_LOGO_FILE_NAME);

	let { children } = $props();
</script>

<svelte:head>
	<title>{PUBLIC_DOCUMENT_TITLE}</title>
	<meta name="description" content={PUBLIC_META_DESCRIPTION} />
</svelte:head>

{#if PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID !== ''}
	<GoogleAnalytics measurementId={PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID} />
{/if}

<div class="container flex flex-col justify-center items-center my-16 max-w-[64rem]">
	<img src={logoUrl} alt="logo" class="h-8" />
	{@render children()}
</div>
