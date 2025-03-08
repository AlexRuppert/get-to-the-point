<script lang="ts">
  import ButtonFooter from '../lib/components/ButtonFooter.svelte'
  import { setModeCurrent } from '@skeletonlabs/skeleton'
  import {
    allCards,
    settings,
    gameState,
    roundState,
    type CardDataEnriched,
    cardList,
    resetGameTriggered
  } from '../stores/store'

  import { fisherYatesShuffle } from '$lib/logic/utils'
  import StatusHeader from '$lib/components/StatusHeader.svelte'
  import CardDeck from '$lib/components/CardDeck.svelte'
  import { enhanceCardInfo, startRound } from '$lib/logic/game'
  import { onMount } from 'svelte'
  setModeCurrent(true)

  let currentCard: CardDataEnriched
  let cardDeck: CardDeck

  let flashWrong = false

  let flashFine = false
  reShuffle()

  function answerWrong() {
    if (!$roundState.hasStarted) return
    flashWrong = true
    setTimeout(() => {
      flashWrong = false
    }, 200)
    $roundState.pointsEarned--
    $roundState.pointsEarned = Math.max($roundState.pointsEarned, 0)
    nextCard()
  }
  function answerSkipped() {
    if ($roundState.totalSeconds < 0) return
    $roundState.totalSeconds -= $settings.secondsPenaltyForSkip

    if ($roundState.totalSeconds > 0) {
      nextCard()
    }
  }
  function answerFine() {
    if (!$roundState.hasStarted) return
    flashFine = true
    setTimeout(() => {
      flashFine = false
    }, 200)
    $roundState.pointsEarned++
    nextCard()
  }

  function reShuffle() {
    $cardList = fisherYatesShuffle(
      $allCards.filter(
        (c) =>
          !$settings.excludeCategories.includes(c.category) &&
          [$settings.difficulties.easy, $settings.difficulties.medium, $settings.difficulties.hard][
            c.difficulty - 1
          ]
      )
    ).map((card) => enhanceCardInfo(card, $settings))

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
    if (cardDeck) await cardDeck.drawnNewCard()
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
  let lastDifficulties = [
    $settings.difficulties.easy,
    $settings.difficulties.medium,
    $settings.difficulties.hard
  ]
  $: {
    if (
      $settings.excludeCategories.join() != lastExcludedCategories.join() ||
      [
        $settings.difficulties.easy,
        $settings.difficulties.medium,
        $settings.difficulties.hard
      ].join() != lastDifficulties.join()
    ) {
      lastExcludedCategories = $settings.excludeCategories
      lastDifficulties = [
        $settings.difficulties.easy,
        $settings.difficulties.medium,
        $settings.difficulties.hard
      ]
      console.log(lastDifficulties)
      $cardList = $cardList.filter((c) => {
        let difficulty = lastDifficulties[c.difficulty - 1]
        return !$settings.excludeCategories.includes(c.category) && difficulty
      })
      advanceCards()
    }
  }
  $: {
    if (!$roundState.hasStarted && mounted) {
      resetCards()
    }
  }

  $: {
    if ($resetGameTriggered) {
      ;(async () => {
        reShuffle()
        advanceCards()
      })()
      console.log(currentCard)
      $resetGameTriggered = false
    }
  }
  let mounted = false
  onMount(async () => {
    setTimeout(() => {
      mounted = true
    }, 10)
  })
</script>

<div
  class="flex h-full mx-auto max-w-md justify-center items-center transition-colors"
  class:bg-red-400={flashWrong}
  class:bg-green-400={flashFine}
>
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
