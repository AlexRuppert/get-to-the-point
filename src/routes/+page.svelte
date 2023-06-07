<script lang="ts">
  import { setModeCurrent } from '@skeletonlabs/skeleton'
  import { allCards, settings, type WordData } from '../stores/store'
  import type { CardData } from '../stores/store'
  import {
    mdiChatAlertOutline,
    mdiCheckCircleOutline,
    mdiDebugStepOver,
    mdiHandOkay
  } from '@mdi/js'
  setModeCurrent(true)
  import PlayCard from '$lib/components/PlayCard.svelte'
  import { fisherYatesShuffle } from '$lib/logic/utils'
  import SvgIcon from '$lib/components/SvgIcon.svelte'
  let currentCard = enhanceCardInfo($allCards[Math.floor(Math.random() * $allCards.length)])
  function enhanceCardInfo(card: CardData) {
    return { ...card, categoryColor: 'rgb(234 88 12)', forbidden: getForbiddenWords(5, card) }
  }

  function getForbiddenWords(amount: number, card: CardData) {
    return fisherYatesShuffle(card.forbidden).slice(0, amount)
  }

  function answerWrong() {}
  function answerSkipped() {}
  function answerFine() {}
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="max-w-md h-full mx-auto flex justify-center items-center">
  <!--PlayCard {isUp} on:click={() => (isUp = !isUp)} containerCardClass="w-52 h-96"
    ><div slot="front" class="bg-white text-blue-900">a</div>
    <div slot="back" class="bg-red-900 text-blue-900">b</div></PlayCard
	-->
  <div class="w-full h-full flex flex-col">
    <div class="grow p-2">
      <div class="rounded-lg shadow-md shadow-slate-500 p-5 pt-6 bg-white">
        <div class="rounded-md border-2 relative" style:border-color={currentCard.categoryColor}>
          <div class="absolute -top-4 left-0 w-full flex justify-center">
            <div
              class="rounded-full px-2 py-1 text-white font-medium tracking-wider capitalize text-sm"
              style:background-color={currentCard.categoryColor}
            >
              {currentCard.category}
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="target-word items-center w-full flex flex-col p-5 min-h-[12em] space-y-2 justify-center"
            >
              <div>
                {#if $settings.languages.german}
                  <div class="text-center text-xl font-medium">{currentCard.target.german}</div>
                {/if}
                {#if $settings.languages.english}
                  <div class="text-center text-xl font-medium">{currentCard.target.english}</div>
                {/if}
              </div>
              {#if $settings.languages.chinese}
                <div>
                  <div class="text-center text-2xl">{currentCard.target.chinese}</div>
                  <div class="text-center text-sm -mt-1">{currentCard.target.pinyin}</div>
                </div>
              {/if}
            </div>
            <div class="forbidden-words space-y-2">
              {#each currentCard.forbidden as forbiddenWords}
                <div
                  class="border-t-2 p-1 flex align-middle justify-center"
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
                      <div class="text-center text-xs -mt-1">{forbiddenWords.pinyin}</div>
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
      class="bg-white w-full btn-group font-semibold text-white [&>*+*]:border-none min-h-[5em] rounded-none"
    >
      <button type="button" class="bg-error-500 w-1/3 btn-lg hover:!text-error-700">
        <span class="w-10"><SvgIcon d={mdiChatAlertOutline} /></span>
        <span>WRONG</span>
      </button>
      <button type="button" class="bg-secondary-500 btn-lg w-1/3 hover:!text-secondary-700">
        <span class="w-10"><SvgIcon d={mdiDebugStepOver} /></span>
        <span>SKIP</span>
      </button>
      <button type="button" class="bg-success-600 w-1/3 hover:!text-success-700">
        <span class="w-10"><SvgIcon d={mdiCheckCircleOutline} /></span>
        <span>FINE</span>
      </button>
    </div>
  </div>
</div>

<style>
</style>
