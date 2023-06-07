import { writable, type Writable } from 'svelte/store'
import * as allCardsJson from '../assets/cards.json'

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
//@ts-ignore
export const allCards: Writable<CardData[]> = writable(allCardsJson.default)
export const settings = writable({
  languages: {
    german: true,
    english: true,
    chinese: true
  }
})