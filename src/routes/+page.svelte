<script lang="ts">
  import { setModeCurrent } from '@skeletonlabs/skeleton'
  import { allCards, settings, gameState, roundState, type WordData } from '../stores/store'
  import type { CardData } from '../stores/store'
  import {
    mdiChatAlertOutline,
    mdiCheckCircleOutline,
    mdiDebugStepOver,
    mdiSkipNext
  } from '@mdi/js'
  setModeCurrent(true)
  import PlayCard from '$lib/components/PlayCard.svelte'
  import { fisherYatesShuffle } from '$lib/logic/utils'
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  import ColorHash from 'color-hash'
  import { initRound } from '$lib/logic/game'

  interface CardDataEnriched extends CardData {
    categoryColor: string
  }

  const colorHash = new ColorHash({ lightness: 0.3, saturation: 0.8 })

  let currentCard: CardDataEnriched
  let cardList = fisherYatesShuffle($allCards).map(enhanceCardInfo)
  let timeLeft = 0
  let currentTime: Date = new Date('2999-12-12')
  nextCard()

  function enhanceCardInfo(card: CardData) {
    return {
      ...card,
      categoryColor: colorHash.hex(card.category),
      forbidden: getForbiddenWords(5, card)
    }
  }

  function getForbiddenWords(amount: number, card: CardData) {
    return fisherYatesShuffle(card.forbidden).slice(0, amount)
  }

  function answerWrong() {
    $roundState.pointsEarned--
    $roundState.pointsEarned = Math.max($roundState.pointsEarned, 0)
    nextCard()
  }
  function answerSkipped() {
    $roundState.totalSeconds -= $settings.secondsPenaltyForSkip
    if ($roundState.totalSeconds < 0) {
      $roundState.totalSeconds = 0
    }
    nextCard()
  }
  function answerFine() {
    $roundState.pointsEarned++
    nextCard()
  }

  function nextCard() {
    currentCard = cardList[$gameState.currentCardIndex]
    $gameState.currentCardIndex += 1
  }

  function nextRound() {
    $roundState = initRound($settings)
    currentTime = new Date()
  }

  setInterval(() => {
    currentTime = new Date()
  }, 200)

  $: {
    timeLeft =
      $roundState.totalSeconds -
      Math.floor((currentTime.getTime() - $roundState.startTime.getTime()) / 1000)
    timeLeft = Math.max(timeLeft, 0)
  }
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="flex h-full mx-auto max-w-md justify-center items-center">
  <!--PlayCard {isUp} on:click={() => (isUp = !isUp)} containerCardClass="w-52 h-96"
    ><div slot="front" class="bg-white text-blue-900">a</div>
    <div slot="back" class="bg-red-900 text-blue-900">b</div></PlayCard
	-->
  <div class="flex flex-col h-full w-full">
    <div class="bg-white rounded-none font-semibold w-full shadow-lg flex justify-between">
      <div class="points p-2 flex justify-items-center items-center space-x-1">
        <span>Points</span><span class="text-3xl tabular-nums">{$roundState.pointsEarned}</span>
      </div>
      <div class="timer p-2 points p-2 flex justify-items-center items-center space-x-1">
        <span>Time</span><span class=" text-3xl tabular-nums">{timeLeft}</span>
      </div>
      <div class="p-2">
        <button class="btn variant-ghost-primary" on:click={nextRound}
          ><span class="w-5"><SvgIcon d={mdiSkipNext} /></span><span>Next Round</span></button
        >
      </div>
    </div>
    <div class="p-2 py-5 grow">
      <div class="bg-white rounded-lg shadow-md p-4 pt-6 shadow-slate-500">
        <div class="rounded-md border-2 relative" style:border-color={currentCard.categoryColor}>
          <div class="flex w-full -top-4 left-0 absolute justify-center">
            <div
              class="rounded-full font-medium text-white text-sm tracking-wider py-1 px-2 capitalize"
              style:background-color={currentCard.categoryColor}
            >
              {currentCard.category}
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="flex flex-col space-y-2 w-full min-h-[10em] p-5 target-word items-center justify-center tracking-wider"
            >
              <div>
                {#if $settings.languages.german}
                  <div class="font-medium text-center text-xl">{currentCard.target.german}</div>
                {/if}
                {#if $settings.languages.english}
                  <div class="font-medium text-center text-xl">{currentCard.target.english}</div>
                {/if}
              </div>
              {#if $settings.languages.chinese}
                <div>
                  <div class="text-center text-2xl">{currentCard.target.chinese}</div>
                  <div class="-mt-1 text-center text-sm">{currentCard.target.pinyin}</div>
                </div>
              {/if}
            </div>
            <div class="forbidden-words tracking-wider">
              {#each currentCard.forbidden as forbiddenWords, i}
                <div
                  class="flex p-1 align-middle justify-center"
                  style:background-color={currentCard.categoryColor + (i % 2 == 0 ? '22' : '44')}
                  style:border-color={currentCard.categoryColor}
                >
                  <div class="w-full">
                    {#if $settings.languages.german}
                      <div class="text-center text-md">{forbiddenWords.german}</div>
                    {/if}
                    {#if $settings.languages.english}
                      <div class="text-center text-md">{forbiddenWords.english}</div>
                    {/if}
                  </div>
                  {#if $settings.languages.chinese}
                    <div class="w-full">
                      <div class="text-center text-xl">{forbiddenWords.chinese}</div>
                      <div class="-mt-1 text-center text-xs">{forbiddenWords.pinyin}</div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-white font-semibold text-white w-full flex min-h-[5em] shadow-black shadow-inner"
    >
      <button
        type="button"
        class="bg-error-500 w-1/3 items-center justify-items-center justify-center space-x-2 p-2 active:!text-error-700 active:bg-white flex"
        on:click={answerWrong}
      >
        <span class="w-10"><SvgIcon d={mdiChatAlertOutline} /></span>
        <span class="">WRONG</span>
      </button>
      <button
        type="button"
        class="bg-secondary-500 w-1/3 items-center justify-items-center justify-center space-x-2 p-2 active:!text-secondary-700 active:bg-white flex"
        on:click={answerSkipped}
      >
        <span class="w-10"><SvgIcon d={mdiDebugStepOver} /></span>
        <span class="">SKIP</span>
      </button>
      <button
        type="button"
        class="bg-success-600 w-1/3 items-center justify-items-center justify-center space-x-2 p-2 active:!text-success-700 active:bg-white flex"
        on:click={answerFine}
      >
        <span class="w-10"><SvgIcon d={mdiCheckCircleOutline} /></span>
        <span class="">FINE</span>
      </button>
    </div>
  </div>
</div>

<style>
</style>
