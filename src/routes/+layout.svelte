<script lang="ts">
  // The ordering of these imports is critical to your app working properly
  import '../theme.postcss'
  // If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
  import '@skeletonlabs/skeleton/styles/skeleton.css'
  // Most of your app wide CSS should be put in this file
  import '../app.postcss'
  import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton'
  //@ts-ignore
  import { pwaInfo } from 'virtual:pwa-info'
  import { modalComponentRegistry } from '$lib/logic/modalComponentRegistry'
  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
  {@html webManifestLink}
</svelte:head>
<Modal components={modalComponentRegistry} />
<!-- App Shell -->
<AppShell>
  <slot />
</AppShell>

<style>
  :global(body) {
    background: #efefef;
  }
  :global(*) {
    -webkit-tap-highlight-color: transparent;
  }
</style>
