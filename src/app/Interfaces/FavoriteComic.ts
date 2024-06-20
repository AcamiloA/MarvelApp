export interface FavoriteComic
{
    id: number,
    user: string,
    comicId: number,
    title: string,
    description: string,
    imgUrl: string,
    isFavorite: boolean
}