<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any

  // Stores
  import { RangeSlider, modalStore } from '@skeletonlabs/skeleton'
  import type { GameSettings } from '../../stores/store'
  import { settings, allCards } from '../../stores/store'
  import { onMount } from 'svelte'
  import { unique } from '$lib/logic/utils'

  // Form Data
  let formData: GameSettings = {
    languages: {
      german: true,
      english: true,
      chinese: true
    },
    secondsPerRound: 150,
    secondsPenaltyForSkip: 10,
    excludeCategories: []
  }

  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit(): void {
    formData.excludeCategories = categories.filter((c) => !c.enabled).map((c) => c.category)
    $settings = formData
    if ($modalStore[0].response) $modalStore[0].response(formData)
    modalStore.close()
  }
  let categories: { category: string; enabled: boolean }[] = []
  onMount(() => {
    formData = JSON.parse(JSON.stringify($settings))
    categories = unique($allCards.map((c) => c.category)).map((category) => ({
      category,
      enabled: !formData.excludeCategories.includes(category)
    }))
  })

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4'
  const cHeader = 'text-2xl font-bold'
  const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token'
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase} max-h-[90vh] flex flex-col">
    <header class={cHeader}>Settings</header>
    <slot />
    <!-- Enable for debugging: -->

    <form class="modal-form h-full {cForm} overflow-y-auto">
      <div class="h-full space-y-10">
        <div>
          <h2 class="text-xl font-semibold mb-5">Rules</h2>
          <div class="space-y-3 pr-5">
            <RangeSlider
              name="range-slider"
              bind:value={formData.secondsPerRound}
              max={5 * 60}
              step={10}
              ticked
            >
              <div class="flex justify-between items-center">
                <div class="">Seconds per Round</div>
                <div class="text-xs">{formData.secondsPerRound}s</div>
              </div>
            </RangeSlider>
            <RangeSlider
              name="range-slider"
              bind:value={formData.secondsPenaltyForSkip}
              max={60}
              step={5}
              ticked
            >
              <div class="flex justify-between items-center">
                <div class="">Seconds-Penalty per Skip</div>
                <div class="text-xs">{formData.secondsPenaltyForSkip}</div>
              </div>
            </RangeSlider>
          </div>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-5">Languages</h2>
          <div class="space-y-3">
            <label class="flex items-center space-x-2">
              <input class="checkbox" type="checkbox" bind:checked={formData.languages.english} />
              <p>English</p>
            </label>
            <label class="flex items-center space-x-2">
              <input class="checkbox" type="checkbox" bind:checked={formData.languages.german} />
              <p>German</p>
            </label>
            <label class="flex items-center space-x-2">
              <input class="checkbox" type="checkbox" bind:checked={formData.languages.chinese} />
              <p>Chinese</p>
            </label>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-5">Categories</h2>

          <div class="space-y-3">
            {#each categories as category}
              <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" bind:checked={category.enabled} />
                <p>{category.category}</p>
              </label>
            {/each}
          </div>
        </div>
      </div>
    </form>

    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Accept</button>
    </footer>
  </div>
{/if}
