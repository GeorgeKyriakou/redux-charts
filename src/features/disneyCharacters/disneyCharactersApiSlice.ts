import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { type ApiResponse } from "../../utils/types/DisneyCharsApiResponse"

export const disneyCharactersApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.disneyapi.dev/character" }),
  reducerPath: "disneyCharactersApi",
  tagTypes: ["DisneyCharacters"],
  endpoints: build => ({
    getDisneyCharacters: build.query<
      ApiResponse,
      { index: number; pageSize: number }
    >({
      query: ({ index = 1, pageSize = 50 }) =>
        `?page=${index}&pageSize=${pageSize}`,
      providesTags: (result, error, { index, pageSize }) => [
        { type: `DisneyCharacters`, id: `${index}x${pageSize}` },
      ],
    }),
  }),
})

export const { useGetDisneyCharactersQuery } = disneyCharactersApiSlice
