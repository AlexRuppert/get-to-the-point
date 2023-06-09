import { get, writable, type Writable } from 'svelte/store'
import * as allCardsJson from '../assets/cards.json'
import { initGame, initRound } from '$lib/logic/game'
import { localStorageStore } from '@skeletonlabs/skeleton';
export interface WordData {
  english: string
  german: string
  chinese: string
  pinyin: string
}
export interface CardData {
  target: WordData
  category: string
  forbidden: WordData[]
}
export interface CardDataEnriched extends CardData {
  categoryColor: string
}

export interface GameState {
  currentCardIndex: number
  currentTeam: Teams
}

export type Teams = 'Team A' | 'Team 1'
export interface RoundState {
  hasStarted: boolean
  pointsEarned: number
  startTime: Date
  totalSeconds: number

}

export interface GameSettings {
  languages: {
    german: boolean
    english: boolean
    chinese: boolean
  }
  secondsPerRound: number
  secondsPenaltyForSkip: number
  excludeCategories: string[]
}
//@ts-ignore
export const allCards: Writable<CardData[]> = writable(allCardsJson.default)
export const settings: Writable<GameSettings> = localStorageStore('get_to_the_point_settings', {
  languages: {
    german: true,
    english: true,
    chinese: true
  },
  secondsPerRound: 150,
  secondsPenaltyForSkip: 10,
  excludeCategories: []
})

let initialGameState = initGame()
export const gameState: Writable<GameState> = writable(initialGameState)

export const roundState: Writable<RoundState> = writable(initRound(get(settings)))

export const cardList: Writable<CardDataEnriched[]> = writable([])