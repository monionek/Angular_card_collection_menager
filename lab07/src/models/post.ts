export interface BlogPost {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
    modifiedAt: Date | null
}