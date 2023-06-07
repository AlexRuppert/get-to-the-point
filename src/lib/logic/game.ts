import { gameState, settings } from './../../stores/store';
import type { GameState, RoundState, GameSettings } from "../../stores/store";

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

