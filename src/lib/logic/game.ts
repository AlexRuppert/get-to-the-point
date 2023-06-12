
import type { GameState, RoundState, GameSettings, CardData } from "../../stores/store";
import ColorHash from 'color-hash'
import { fisherYatesShuffle } from './utils';
export function initGame(): GameState {
  return {
    currentCardIndex: 0,
    currentTeam: 'Team A'
  }
}
export function initRound(settings: GameSettings): RoundState {

  return {
    hasStarted: false,
    pointsEarned: 0,
    startTime: new Date(),
    totalSeconds: settings.secondsPerRound

  }

}

export function startRound(state: RoundState) {
  state.hasStarted = true
  state.startTime = new Date()
  return state
}

const colorHash = new ColorHash({ lightness: 0.3, saturation: 0.8 })
export function enhanceCardInfo(card: CardData) {
  return {
    ...card,
    categoryColor: colorHash.hex(card.category),
    forbidden: getForbiddenWords(5, card)
  }
}
export function getForbiddenWords(amount: number, card: CardData) {
  return fisherYatesShuffle(card.forbidden).slice(0, amount)
}