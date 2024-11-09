<script lang="ts">
	interface Props {
		measurementId: string;
	}

	let { measurementId }: Props = $props();

	const src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
</script>

<svelte:head>
	<script async {src}>
	</script>

	{@html `<script>const measurementId = '${measurementId}';</script>`}

	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			window.dataLayer.push(arguments);
		}
		window.gtag = gtag;
		gtag('js', new Date());
		gtag('config', measurementId);
	</script>
</svelte:head>
