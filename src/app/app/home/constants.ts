import { DifficultDefinition } from "./types";

export const USER_NAME_STORAGE = 'USER_NAME_LS';

export const HIGHSCORES_STORAGE = 'HIGHSCORES_LS';

export const MAX_HIGHSCORES = 5;

export const API_CARDS = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries';

export const DEFAULT_USER_NAME = 'Guest';

export enum gameDifficulties {
    easy = 'easy',
    normal = 'normal',
    hard = 'hard',
};

export const DEFAULT_CARDS = 20;

export const DEFAULT_DIFFICULT = gameDifficulties.hard;

export const GAME_DIFFICULTIES: DifficultDefinition[] = [
    {
        key: gameDifficulties.easy,
        label: 'Easy',
        cards: 8,
    },
    {
        key: gameDifficulties.normal,
        label: 'Normal',
        cards: 14,
    },
    {
        key: gameDifficulties.hard,
        label: 'Hard',
        cards: 20,
    },
];