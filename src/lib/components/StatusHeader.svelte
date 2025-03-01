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

<div class="bg-white rounded-none font-semibold w-full shadow-lg flex justify-between rounded-b-lg">
  <button class="btn text-secondary-700 h-full p-4" on:click={openSettings}
    ><span class="w-5"><SvgIcon d={mdiCog} /></span></button
  >
  <div class="flex space-x-4">
    <div class="timer p-2 flex justify-items-center items-center space-x-1">
      <span class="small-caps">Time</span><span class=" text-4xl tabular-nums w-[ch]"
        >{timeLeft}</span
      >
    </div>
    <div class="flex flex-col -space-y-2 self-center">
      <div class="flex justify-items-center items-center space-x-1">
        <span class="w-12 small-caps" style:color={getTeamColorHex($gameState.currentTeam)}
          >Team</span
        >
        <span class="text-xl tabular-nums" style:color={getTeamColorHex($gameState.currentTeam)}
          >{$gameState.currentTeam}</span
        >
      </div>
      <div class="flex justify-items-center items-center space-x-1">
        <span class="w-12 small-caps">Points</span>
        <span class="text-xl tabular-nums"
          >{$roundState.hasStarted ? $roundState.pointsEarned : oldPoints}</span
        >
      </div>
    </div>
  </div>

  <div class="p-2 flex flex-nowrap space-x-1">
    <button class="btn variant-ghost-primary px-3" on:click={nextRound}
      ><span class="w-5 p-0"><SvgIcon d={mdiSkipNext} /></span><span>Next Team</span></button
    >
  </div>
</div>

<style>
  :global(.small-caps) {
    font-variant: all-small-caps;
  }
</style>
