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

export type CardApiResponse = {
    entries: Card[];
    meta: {
        current_page: number;
        per_page: number;
        total_entries: number;
        total_pages: number;
    };
};

export type AnyObject = {
    [prop: string]: string;
}

export type GameOverDialogData = {
    userName: String;
    scoreSuccess: number;
    scoreError: number;
};

export type GameDifficulty = 'easy' | 'normal' | 'hard';

export type DifficultDefinition = {
    key: GameDifficulty,
    label: string;
    cards: number;
};

export type HighScore = {
    name: string;
    score: number;
};
