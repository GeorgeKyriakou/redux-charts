export type ApiResponse = {
  info: ApiInfo
  data: DisneyCharacter[]
}

export type ApiInfo = {
  count: number
  totalPages: number
  previousPage: number | null
  nextPage: string
}

export type DisneyCharacter = {
  _id: number
  films: string[]
  shortFilms: string[]
  tvShows: string[]
  videoGames: string[]
  parkAttractions: string[]
  allies: string[]
  enemies: string[]
  sourceUrl: string
  name: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  url: string
  __v: number
}
