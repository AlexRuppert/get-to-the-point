import type { GameState, RoundState, GameSettings, CardData } from '../../stores/store'
import { cardList, gameState, resetGameTriggered, roundState, settings } from '../../stores/store'
import ColorHash from 'color-hash'
import { fisherYatesShuffle } from './utils'
import { get } from 'svelte/store'
import { tick } from 'svelte'

export async function resetGame() {
  roundState.set(initRound(get(settings)))

  await tick()
  resetGameTriggered.set(true)
}
export function initGame(): GameState {
  return {
    currentCardIndex: 0,
    currentTeam: teams[0]
  }
}
const teams = ['Alpha', 'One']
export function nextTeam(currentTeam: string): string {
  let index = teams.indexOf(currentTeam)
  index++
  if (index > teams.length - 1) {
    index = 0
  }
  return teams[index]
}

export function getTeamColorHex(team: string) {
  return colorHash.hex(team)
}
export function getHexColor(seed: string) {
  return colorHash.hex(seed)
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
export function enhanceCardInfo(card: CardData, settings: GameSettings) {
  return {
    ...card,
    categoryColor: colorHash.hex(card.category),
    forbidden: getForbiddenWords(settings?.forbiddenWords ?? 5, card)
  }
}
export function getForbiddenWords(amount: number, card: CardData) {
  return fisherYatesShuffle(card.forbidden).slice(0, amount)
}
