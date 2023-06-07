<svelte:options immutable />

<script lang="ts">
  export let d: string
  const dim = 24
</script>

<svg viewBox="0 0 {dim} {dim}" fill="currentColor" width="100%" height="100%" stroke="none">
  <path {d} />
</svg>

<style global>
</style>
