export interface Card {
    readonly name: string,
    readonly color: readonly Color[],
    readonly manaCost: number,
    readonly attack: number,
    readonly health: number
}

export interface Collection {
    readonly id: string,
    readonly name: string,
    readonly createdAt: string,
    readonly cards: readonly Card[]
    readonly colors: readonly Color[];
}

export type SortMode = 'nameAsc' | 'nameDesc' | 'dateAsc' | 'dateDesc'

export type Color = 'WHITE' | 'BLUE' | 'BLACK' | 'RED' | 'GREEN' | 'COLORLESS';
