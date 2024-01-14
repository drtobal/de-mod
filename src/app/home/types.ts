/** card type retrieved from api, contract is unknown */
export type Card = {
    meta: {
        name: string,
        slug: string,
        tags: [], // type?
        type: 'game',
        uuid: string,
        space: string,
        author: {},
        locale: 'es',
        excerpt: string,
        private: boolean,
        category: null,
        segments: [],
        created_at: string,
        updated_at: string,
        published_at: string,
        unpublish_at: null,
        version_type: string,
        category_name: null,
        category_slug: null,
        available_locales: string[],
    },
    fields: {
        image: {
            url: string,
            tags: [],
            uuid: string,
            title: string,
            alt_text: string | null,
            description: string | null,
            content_type: string,
        },
    },
};

/** responde of api cards */
export type CardApiResponse = {
    entries: Card[];
    meta: {
        current_page: number;
        per_page: number;
        total_entries: number;
        total_pages: number;
    };
};

/** object with free properties */
export type AnyObject = {
    [prop: string]: string;
}

/** data to display game over dialog */
export type GameOverDialogData = {
    userName: String;
    scoreSuccess: number;
    scoreError: number;
    difficulty: DifficultDefinition;
};

/** kinds of difficults */
export type GameDifficulty = 'easy' | 'normal' | 'hard';

/** configuration of each difficulty */
export type DifficultDefinition = {
    key: GameDifficulty,
    label: string;
    cards: number;
    bonus: number;
};

/** high score record */
export type HighScore = {
    name: string;
    score: number;
};
