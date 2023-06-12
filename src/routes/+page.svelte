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
  import { enhanceCardInfo } from '$lib/logic/game'

  let currentCard: CardDataEnriched
  let cardDeck: CardDeck
  $cardList = fisherYatesShuffle($allCards).map(enhanceCardInfo)
  nextCard()

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
    if (cardDeck) cardDeck.drawnNewCard()
    currentCard = $cardList[$gameState.currentCardIndex]
    $gameState.currentCardIndex += 1
  }
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->

<div class="flex h-full mx-auto max-w-md justify-center items-center">
  <div class="flex flex-col h-full w-full select-none">
    <StatusHeader />
    <CardDeck
      bind:this={cardDeck}
      on:answerSkipped={answerSkipped}
      on:answerFine={answerFine}
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
