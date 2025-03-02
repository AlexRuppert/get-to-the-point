<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  import { mdiChatAlertOutline, mdiCheckCircleOutline, mdiDebugStepOver } from '@mdi/js'
  import { roundState } from '../../stores/store'
  import { slide } from 'svelte/transition'
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

<div class="">
  {#if $roundState.hasStarted}
    <div
      class="bg-white font-semibold text-white text-xl w-full flex min-h-[4rem] rounded-t-lg overflow-hidden"
      transition:slide={{ axis: 'x' }}
      style="box-shadow: 0 -2px 8px #777;"
    >
      <button
        type="button"
        class="bg-rose-600 w-1/3 overflow-hidden items-center justify-items-center justify-center p-2 active:!text-error-700 active:bg-white flex space-x-2"
        on:click={answerWrong}
      >
        <span class="w-5"><SvgIcon d={mdiChatAlertOutline} /></span>
        <span class="">WRONG</span>
      </button>
      <button
        type="button"
        class="bg-slate-600 w-1/3 overflow-hidden items-center justify-items-center justify-center p-2 active:!text-secondary-700 active:bg-white flex space-x-2"
        on:click={answerSkipped}
      >
        <span class="w-5"><SvgIcon d={mdiDebugStepOver} /></span>
        <span class="">SKIP</span>
      </button>
      <button
        type="button"
        class="bg-green-600 w-1/3 overflow-hidden items-center justify-items-center justify-center p-2 active:!text-success-700 active:bg-white flex space-x-2"
        on:click={answerFine}
      >
        <span class="w-5"><SvgIcon d={mdiCheckCircleOutline} /></span>
        <span class="">FINE</span>
      </button>
    </div>
  {:else}{/if}
</div>

<style>
</style>
