<script lang="ts">
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  import { mdiCog, mdiSkipNext } from '@mdi/js'
  import { roundState, settings, type WordData } from '../../stores/store'
  import { initRound } from '$lib/logic/game'
  import { createEventDispatcher } from 'svelte'
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'

  const dispatch = createEventDispatcher()
  let timeLeft = 0
  let currentTime: Date = new Date('2999-12-12')
  let oldPoints: number = 0
  function nextRound() {
    oldPoints = $roundState.pointsEarned
    $roundState = initRound($settings)
    currentTime = new Date()
  }

  function openSettings() {
    const modal: ModalSettings = {
      type: 'component',
      // Pass the component registry key as a string:
      component: 'settingsModal'
    }
    modalStore.trigger(modal)
  }

  setInterval(() => {
    currentTime = new Date()
  }, 200)

  $: {
    if ($roundState.hasStarted) {
      timeLeft = Math.min(
        $roundState.totalSeconds,
        Math.max(
          $roundState.totalSeconds -
            Math.floor((currentTime.getTime() - $roundState.startTime.getTime()) / 1000),
          0
        )
      )
    } else {
      timeLeft = $roundState.totalSeconds
    }

    if (timeLeft <= 0) {
      dispatch('timeOut', {})
      nextRound()
    }
  }
</script>

<div class="bg-white rounded-none font-semibold w-full shadow-lg flex justify-between">
  <div class="points p-2 flex justify-items-center items-center space-x-1">
    <span>Points</span><span class="text-2xl tabular-nums"
      >{$roundState.hasStarted ? $roundState.pointsEarned : oldPoints}</span
    >
  </div>
  <div class="timer p-2 points flex justify-items-center items-center space-x-1">
    <span>Time</span><span class=" text-2xl tabular-nums">{timeLeft}</span>
  </div>
  <div class="p-2 flex flex-nowrap space-x-1">
    <button class="btn variant-ghost-primary" on:click={nextRound}
      ><span class="w-5"><SvgIcon d={mdiSkipNext} /></span><span>Next</span></button
    >
    <button class="btn variant-ghost-secondary h-full" on:click={openSettings}
      ><span class="w-5"><SvgIcon d={mdiCog} /></span></button
    >
  </div>
</div>

<style>
</style>
