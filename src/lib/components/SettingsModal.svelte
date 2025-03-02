<script lang="ts">
  // Props
  /** Exposes parent props to this component. */
  export let parent: any

  // Stores
  import { RangeSlider, modalStore } from '@skeletonlabs/skeleton'
  import type { GameSettings } from '../../stores/store'
  import { settings, allCards, DEFAULT_SETTINGS } from '../../stores/store'
  import { onMount } from 'svelte'
  import { unique } from '$lib/logic/utils'
  import { resetGame } from '$lib/logic/game'
  import { tick } from 'svelte'
  import deepmerge from 'deepmerge'
  import SvgIcon from './SvgIcon.svelte'
  import { mdiFullscreen } from '@mdi/js'
  // Form Data
  let formData: GameSettings = deepmerge(DEFAULT_SETTINGS, $settings)

  // We've created a custom submit function to pass the response and close the modal.
  async function onFormSubmit() {
    formData.excludeCategories = categories.filter((c) => !c.enabled).map((c) => c.category)
    $settings = formData

    if ($modalStore[0].response) $modalStore[0].response(formData)
    modalStore.close()
    resetGame()
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

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
  <div class="modal-example-form {cBase} max-h-[90vh] flex flex-col">
    <header class={cHeader}>Settings</header>
    <slot />
    <!-- Enable for debugging: -->
    <button class="btn variant-ghost-primary px-3" on:click={toggleFullScreen}
      ><span class="w-5 p-0"><SvgIcon d={mdiFullscreen} /></span><span>Fullscreen</span></button
    >
    <form class="modal-form h-full {cForm} overflow-y-auto">
      <div class="h-full space-y-10">
        <div>
          <h2 class="text-xl font-semibold mb-5">Word Categories</h2>

          <div class="space-y-3">
            {#each categories as category}
              <label class="flex items-center space-x-2">
                <input class="checkbox" type="checkbox" bind:checked={category.enabled} />
                <p>{category.category}</p>
              </label>
            {/each}
          </div>
        </div>
        <div>
          <h2 class="text-xl font-semibold mb-5">Rules</h2>
          <div class="space-y-5 pr-5">
            <RangeSlider
              name="range-slider"
              bind:value={formData.secondsPerRound}
              max={5 * 60}
              step={10}
              ticked
            >
              <div class="flex justify-between items-center -mb-3">
                <div class="">Seconds per round</div>
                <div class="text-sn">{formData.secondsPerRound}s</div>
              </div>
            </RangeSlider>
            <RangeSlider
              name="range-slider"
              bind:value={formData.secondsPenaltyForSkip}
              max={60}
              step={2}
              ticked
            >
              <div class="flex justify-between items-center -mb-3">
                <div class="">Seconds deducted per skip</div>
                <div class="text-sm">{formData.secondsPenaltyForSkip}</div>
              </div>
            </RangeSlider>

            <RangeSlider
              name="range-slider"
              bind:value={formData.forbiddenWords}
              min={0}
              max={7}
              step={1}
              ticked
            >
              <div class="flex justify-between items-center -mb-3">
                <div class="">Limit forbidden words per card</div>
                <div class="text-sn">{formData.forbiddenWords}</div>
              </div>
            </RangeSlider>
          </div>
        </div>
        <div>
          <div class="flex space-x-8">
            <div>
              <h2 class="text-xl font-semibold mb-5">Languages</h2>
              <div class="space-y-3">
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.languages.german}
                  />
                  <p>German</p>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.languages.english}
                  />
                  <p>English</p>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.languages.chinese}
                  />
                  <p>Chinese</p>
                </label>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-5">Difficulties</h2>
              <div class="space-y-3">
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.difficulties.easy}
                  />
                  <p>Easy</p>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.difficulties.medium}
                  />
                  <p>Medium</p>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    class="checkbox"
                    type="checkbox"
                    bind:checked={formData.difficulties.hard}
                  />
                  <p>Hard</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pt-10">
        <table class="link-table">
          <tbody>
            <tr>
              <td>Website:</td>
              <td
                ><a
                  class="underline break-all"
                  target="_blank"
                  href="https://alexruppert.github.io/get-to-the-point"
                  >https://alexruppert.github.io/get-to-the-point</a
                ></td
              >
            </tr>
            <tr>
              <td>GitHub:</td>
              <td
                ><a
                  class="underline break-all"
                  target="_blank"
                  href="https://github.com/AlexRuppert/get-to-the-point"
                  >https://github.com/AlexRuppert/get-to-the-point</a
                ></td
              >
            </tr>
          </tbody>
        </table>
      </div>
    </form>

    <!-- prettier-ignore -->
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Accept</button>
    </footer>
  </div>
{/if}

<style>
  .link-table tr td:first-child {
    padding-right: 1rem;
  }
  .link-table tr td {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
</style>
