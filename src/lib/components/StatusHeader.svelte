<script lang="ts">
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  import { mdiCog, mdiSkipNext } from '@mdi/js'
  import { gameState, roundState, settings, type WordData } from '../../stores/store'
  import { getTeamColorHex, initRound, nextTeam } from '$lib/logic/game'
  import { createEventDispatcher } from 'svelte'
  import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton'

  const dispatch = createEventDispatcher()
  let timeLeft = 0
  let currentTime: Date = new Date('2999-12-12')
  let oldPoints: number = 0
  function nextRound() {
    oldPoints = $roundState.pointsEarned
    $roundState = initRound($settings)
    $roundState.oldPointsEarned = oldPoints
    $gameState.currentTeam = nextTeam($gameState.currentTeam)
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

  let timeLeftFactor = 1
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

    timeLeftFactor = Math.max(0, Math.min(1, timeLeft / $settings.secondsPerRound))
    if (timeLeft <= 0) {
      dispatch('timeOut', {})

      nextRound()
    }
  }
</script>

<div
  class="bg-white rounded-none font-semibold w-full shadow-lg flex justify-between rounded-b-lg overflow-hidden"
>
  <div class="">
    <button class="btn bg-teal-600 text-white rounded-none h-full px-3" on:click={openSettings}
      ><span class="w-6 p-0"><SvgIcon d={mdiCog} /></span></button
    >
  </div>
  <div class="h-full w-full relative">
    <div class=" w-full h-[calc(100%_-_12px)] flex self-start items-center">
      <div class="flex place-items-center w-full pl-2 space-x-2">
        <span class="small-caps" style:color={getTeamColorHex($gameState.currentTeam)}>Team</span>
        <span class="text-xl tabular-nums" style:color={getTeamColorHex($gameState.currentTeam)}
          >{$gameState.currentTeam}</span
        >
      </div>

      <div class="flex place-items-center w-full px-2 space-x-2">
        <span class="small-caps">Points</span>
        <span class="text-2xl tabular-nums w-[2ch]"
          >{$roundState.hasStarted ? $roundState.pointsEarned : oldPoints}</span
        >
      </div>
    </div>
    <div class="absolute bottom-0 -left-px right-0">
      <div
        class="h-3 bg-slate-600 transition-all text-white text-[0.5em] w-full ease-in leading-3 uppercase tracking-widest px-1"
        class:bg-red-700={+timeLeft < 11}
        style:width={timeLeftFactor * 100 + '%'}
      >
        Time
      </div>
    </div>
  </div>

  <div class="flex flex-nowrap space-x-1 shrink-0">
    <button
      type="button"
      class="bg-teal-600 items-center justify-center px-2 active:!text-success-700 active:bg-white flex space-x-1 text-white"
      on:click={nextRound}
    >
      <span class="w-5"><SvgIcon d={mdiSkipNext} /></span>
      <span class="">End Round </span>
    </button>
  </div>
</div>

<style>
  :global(.small-caps) {
    font-variant: all-small-caps;
  }
</style>
