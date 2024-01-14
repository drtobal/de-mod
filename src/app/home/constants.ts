import { DifficultDefinition } from "./types";

/** localstorage name to save user name */
export const USER_NAME_STORAGE = 'USER_NAME_LS';

/** localstorage name to save high scores */
export const HIGHSCORES_STORAGE = 'HIGHSCORES_LS';

/** max amount of highscores saved and displayed */
export const MAX_HIGHSCORES = 5;

/** url of the api to get cards // TODO: environments not implemented */
export const API_CARDS = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries';

/** default user name for the game */
export const DEFAULT_USER_NAME = 'Guest';

/** available difficulties */
export enum gameDifficulties {
    easy = 'easy',
    normal = 'normal',
    hard = 'hard',
};

/** defaults cards to display, 20 is for hard */
export const DEFAULT_CARDS = 20;

/** hard is default difficult */
export const DEFAULT_DIFFICULT = gameDifficulties.hard;

/** list of all available difficulties in array format */
export const GAME_DIFFICULTIES: DifficultDefinition[] = [
    {
        key: gameDifficulties.easy,
        label: 'Easy',
        cards: 8,
        bonus: 5,
    },
    {
        key: gameDifficulties.normal,
        label: 'Normal',
        cards: 14,
        bonus: 10
    },
    {
        key: gameDifficulties.hard,
        label: 'Hard',
        cards: 20,
        bonus: 20,
    },
];