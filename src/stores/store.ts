import { get, writable, type Writable } from 'svelte/store'
import * as allCardsJson from '../assets/cards.json'
import { initGame, initRound } from '$lib/logic/game'
import { localStorageStore } from '@skeletonlabs/skeleton'
export interface WordData {
  en: string
  de: string
  zh: string
  pinyin: string
}
export interface CardData {
  word: WordData
  category: string
  difficulty: number
  forbidden: WordData[]
}
export interface CardDataEnriched extends CardData {
  categoryColor: string
}

export interface GameState {
  currentCardIndex: number
  currentTeam: string
}

export interface RoundState {
  hasStarted: boolean
  pointsEarned: number
  oldPointsEarned: number
  startTime: Date
  totalSeconds: number
}

export interface GameSettings {
  languages: {
    german: boolean
    english: boolean
    chinese: boolean
  }
  difficulties: {
    easy: boolean
    medium: boolean
    hard: boolean
  }
  forbiddenWords: number
  secondsPerRound: number
  secondsPenaltyForSkip: number
  excludeCategories: string[]
}
//@ts-ignore
export const allCards: Writable<CardData[]> = writable(allCardsJson.default)
export const DEFAULT_SETTINGS = {
  languages: {
    german: true,
    english: true,
    chinese: true
  },
  difficulties: {
    easy: true,
    medium: false,
    hard: false
  },
  forbiddenWords: 5,
  secondsPerRound: 150,
  secondsPenaltyForSkip: 1,
  excludeCategories: []
}
export const settings: Writable<GameSettings> = localStorageStore(
  'get_to_the_point_settings',
  DEFAULT_SETTINGS
)

let initialGameState = initGame()
export const gameState: Writable<GameState> = writable(initialGameState)

export const roundState: Writable<RoundState> = writable(initRound(get(settings)))

export const cardList: Writable<CardDataEnriched[]> = writable([])

export const resetGameTriggered: Writable<boolean> = writable(false)
