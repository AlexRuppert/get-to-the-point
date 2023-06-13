<script lang="ts">
  import ButtonFooter from '../lib/components/ButtonFooter.svelte'
  import { setModeCurrent } from '@skeletonlabs/skeleton'
  import {
    allCards,
    settings,
    gameState,
    roundState,
    type CardDataEnriched,
    cardList
  } from '../stores/store'

  setModeCurrent(true)

  import { fisherYatesShuffle } from '$lib/logic/utils'

  import StatusHeader from '$lib/components/StatusHeader.svelte'
  import CardDeck from '$lib/components/CardDeck.svelte'
  import { enhanceCardInfo, startRound } from '$lib/logic/game'
  import { onMount } from 'svelte/internal'

  let currentCard: CardDataEnriched
  let cardDeck: CardDeck
  reShuffle()

  function answerWrong() {
    if (!$roundState.hasStarted) return
    $roundState.pointsEarned--
    $roundState.pointsEarned = Math.max($roundState.pointsEarned, 0)
    nextCard()
  }
  function answerSkipped() {
    if (!$roundState.hasStarted) return
    $roundState.totalSeconds -= $settings.secondsPenaltyForSkip
    if ($roundState.totalSeconds < 0) {
      $roundState.totalSeconds = 0
    }
    nextCard()
  }
  function answerFine() {
    if (!$roundState.hasStarted) return
    $roundState.pointsEarned++
    nextCard()
  }

  function reShuffle() {
    $cardList = fisherYatesShuffle(
      $allCards.filter((c) => !$settings.excludeCategories.includes(c.category))
    ).map(enhanceCardInfo)
    console.log(cardList)
    console.log($settings.excludeCategories.includes('animals'))
    currentCard = $cardList[0]
  }
  function advanceCards() {
    currentCard = $cardList[$gameState.currentCardIndex]
    $gameState.currentCardIndex += 1
    if ($gameState.currentCardIndex >= $cardList.length) {
      $gameState.currentCardIndex = 0
      reShuffle()
    }
  }

  async function nextCard() {
    if (cardDeck) cardDeck.drawnNewCard()
    advanceCards()
  }
  async function resetCards() {
    if (cardDeck) await cardDeck.drawnNewCardClosed()
    advanceCards()
  }
  async function handleCardBackTap(event: { detail: { type: string } }) {
    if (event.detail.type == 'back' && !$roundState.hasStarted) {
      await nextCard()
      $roundState = startRound($roundState)
    }
  }
  let lastExcludedCategories = $settings.excludeCategories
  $: {
    if ($settings.excludeCategories.join() != lastExcludedCategories.join()) {
      lastExcludedCategories = $settings.excludeCategories
      $cardList = $cardList.filter((c) => !$settings.excludeCategories.includes(c.category))
      advanceCards()
    }
  }
  $: {
    if (!$roundState.hasStarted && mounted) {
      resetCards()
    }
  }
  let mounted = false
  onMount(async () => {
    setTimeout(() => {
      mounted = true
    }, 10)
  })
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="flex h-full mx-auto max-w-md justify-center items-center">
  <div class="flex flex-col h-full w-full select-none">
    <StatusHeader />
    <CardDeck
      bind:this={cardDeck}
      on:answerSkipped={answerSkipped}
      on:answerFine={answerFine}
      on:tapCard={handleCardBackTap}
      {currentCard}
    />
    <ButtonFooter
      on:answerWrong={answerWrong}
      on:answerSkipped={answerSkipped}
      on:answerFine={answerFine}
    />
  </div>
</div>

<style>
</style>
