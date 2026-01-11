export interface Collection {
    readonly id: string,
    readonly name: string,
    readonly createdAt: string,
    // readonly Cards: Card[]
    readonly colors: readonly Color[];
}

export type SortMode = 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'

export type Color = 'WHITE' | 'BLUE' | 'BLACK' | 'RED' | 'GREEN' | 'COLORLESS';
