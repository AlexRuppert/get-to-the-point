<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  import { mdiChatAlertOutline, mdiCheckCircleOutline, mdiDebugStepOver } from '@mdi/js'
  const dispatch = createEventDispatcher()

  function answerWrong() {
    dispatch('answerWrong', {})
  }
  function answerSkipped() {
    dispatch('answerSkipped', {})
  }
  function answerFine() {
    dispatch('answerFine', {})
  }
</script>

<div
  class="bg-white font-semibold text-white w-full flex min-h-[6em]"
  style="box-shadow: 0 -2px 8px #777;"
>
  <button
    type="button"
    class="bg-error-500 w-1/3 items-center justify-items-center justify-center p-2 active:!text-error-700 active:bg-white flex flex-col"
    on:click={answerWrong}
  >
    <span class="w-10"><SvgIcon d={mdiChatAlertOutline} /></span>
    <span class="">WRONG</span>
  </button>
  <button
    type="button"
    class="bg-secondary-500 w-1/3 items-center justify-items-center justify-center p-2 active:!text-secondary-700 active:bg-white flex flex-col"
    on:click={answerSkipped}
  >
    <span class="w-10"><SvgIcon d={mdiDebugStepOver} /></span>
    <span class="">SKIP</span>
  </button>
  <button
    type="button"
    class="bg-success-600 w-1/3 items-center justify-items-center justify-center p-2 active:!text-success-700 active:bg-white flex flex-col"
    on:click={answerFine}
  >
    <span class="w-10"><SvgIcon d={mdiCheckCircleOutline} /></span>
    <span class="">FINE</span>
  </button>
</div>

<style>
</style>
