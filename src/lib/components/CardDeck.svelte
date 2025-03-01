<script lang="ts">
  import { roundState, settings, type CardDataEnriched } from '../../stores/store'

  import { pan } from 'svelte-gestures'
  import { spring } from 'svelte/motion'
  import { createEventDispatcher, tick } from 'svelte'
  import PlayCard from './PlayCard.svelte'
  import { getHexColor } from '$lib/logic/game'

  export let currentCard: CardDataEnriched
  const dispatch = createEventDispatcher()

  const cardTouch = { start: { x: 0, y: 0 } }
  const cardTouchDelta = spring({ x: 0, y: 0 })
  const CARD_SWIPE_THRESHOLD = 60
  let cardTouchElement: HTMLElement
  let playCard: PlayCard
  function cardSwipeHandlerUp(event: { detail: any }) {
    cardTouchElement.releasePointerCapture(event.detail.event.pointerId)
    if (Math.abs($cardTouchDelta.x) > CARD_SWIPE_THRESHOLD) {
      if ($cardTouchDelta.x < 0) {
        dispatch('answerSkipped', {})
      }
      if ($cardTouchDelta.x > 0) {
        dispatch('answerFine', {})
      }
      cardTouchDelta.set({ x: 0, y: 0 }, { hard: true })
    } else {
      cardTouchDelta.set({ x: 0, y: 0 })
    }
  }

  function cardSwipeHandlerMove(event: any) {
    cardTouchDelta.set({
      x: event.detail.event.x - cardTouch.start.x,
      y: event.detail.event.y - cardTouch.start.y
    })
  }
  function cardSwipeHandlerDown(event: any) {
    if (!$roundState.hasStarted) return
    cardTouchElement.setPointerCapture(event.detail.event.pointerId)
    cardTouch.start = { x: event.detail.event.x, y: event.detail.event.y }
  }

  export async function drawnNewCard() {
    return playCard.flipFromBack()
  }
  export async function drawnNewCardClosed() {
    return playCard?.flipToBack()
  }

  let isUp = false

  $: {
    if (!isUp && !$roundState.hasStarted) {
      drawnNewCardClosed()
    }
  }
</script>

<div class="grow relative">
  <PlayCard bind:this={playCard} bind:isUp containerCardClass="absolute inset-3" on:tapCard>
    <div
      slot="front"
      class="bg-white rounded-lg shadow-md p-4 py-6 shadow-slate-400 transform translate-x-0 select-none origin-bottom h-full w-full"
      class:pointer-events-none={!isUp}
      style:--tw-translate-x={$cardTouchDelta.x + 'px'}
      style:--tw-rotate={$cardTouchDelta.x / 70 + 'deg'}
      bind:this={cardTouchElement}
      use:pan={{ delay: 300 }}
      on:pandown={cardSwipeHandlerDown}
      on:panup={cardSwipeHandlerUp}
      on:panmove={cardSwipeHandlerMove}
    >
      <div
        class="rounded-md border-2 relative h-full"
        style:border-color={currentCard.categoryColor}
      >
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
            class="flex flex-col space-y-2 w-full h-full min-h-[9.5em] py-5 target-word items-center justify-center tracking-wider leading-4"
          >
            <div class="w-full target-words" style="--border-color: {currentCard.categoryColor}">
              {#if $settings.languages.german}
                <div class="py-2 font-medium text-center text-xl">
                  {currentCard.target.german}
                </div>
              {/if}

              {#if $settings.languages.english}
                <div class="py-2 font-medium text-center text-xl">{currentCard.target.english}</div>
              {/if}
              {#if $settings.languages.chinese}
                <div class="py-2">
                  <div class="text-center text-2xl">{currentCard.target.chinese}</div>
                  <div class="-mt-1 text-center text-sm">{currentCard.target.pinyin}</div>
                </div>
              {/if}
            </div>
          </div>
          <div class="forbidden-words tracking-wider leading-4 h-full">
            {#each currentCard.forbidden as forbiddenWords, i}
              <div
                class="flex align-middle justify-center p-1 min-h-[3em]"
                style:background-color={currentCard.categoryColor + (i % 2 == 0 ? '22' : '44')}
                style:border-color={currentCard.categoryColor}
              >
                <div
                  class="flex flex-col items-center justify-center"
                  class:w-full={$settings.languages.german || $settings.languages.english}
                >
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
    <div
      slot="back"
      class="rounded-lg shadow-md shadow-slate-400 back-card w-full h-full"
      class:pointer-events-none={isUp}
    ></div></PlayCard
  >

  <div
    class="absolute top-10 left-10 right-10 text-center p-1 rounded-full text-white text-xl opacity-0 pointer-events-none"
    class:bg-secondary-500={$cardTouchDelta.x < 0}
    class:bg-success-500={$cardTouchDelta.x > 0}
    style:opacity={(+(Math.abs($cardTouchDelta.x) > CARD_SWIPE_THRESHOLD) *
      Math.abs($cardTouchDelta.x) -
      CARD_SWIPE_THRESHOLD) /
      20}
  >
    <span class="whitespace-pre"
      >{$cardTouchDelta.x < 0 ? 'Skip' : $cardTouchDelta.x > 0 ? 'Fine' : ' '}</span
    >
  </div>
  <div
    class="bg-white rounded-lg shadow-sm p-4 pt-6 shadow-slate-500 transform translate-x-0 select-none origin-bottom absolute inset-3 -z-10 back-card"
  ></div>
</div>

<style>
  .back-card {
    background-color: #daeeff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%237eaeff' fill-opacity='1' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
  }

  .target-words > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-y-reverse: 0;
    border-top-width: calc(2px * calc(1 - var(--tw-divide-y-reverse)));
    border-bottom-width: calc(2px * var(--tw-divide-y-reverse));
    border-color: var(--border-color);
  }
</style>
