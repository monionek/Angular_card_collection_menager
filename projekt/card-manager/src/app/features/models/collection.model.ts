
export interface Collection {
    readonly id: string,
    readonly name: string,
    readonly createdAt: string,
    readonly cards: string[],
    readonly colors: readonly Color[];
}

export type SortMode = 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc' | 'mostCards' | "leastCards"

export type Color = 'WHITE' | 'BLUE' | 'BLACK' | 'RED' | 'GREEN' | 'COLORLESS';
