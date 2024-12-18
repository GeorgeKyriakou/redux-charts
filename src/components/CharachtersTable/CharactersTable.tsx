import {
  type ApiInfo,
  type DisneyCharacter,
} from "@/utils/types/DisneyCharsApiResponse"
import { HeaderOptions } from "@/components/HeaderOptions/HeaderOptions"
import TableContent from "@/components/TableContent/Table"

interface TableDataProps {
  info: ApiInfo
  data: DisneyCharacter[]
  searchValue: string
  charactersPerPage: number
  currentPageIndex: number
  movieSearchValue: string
  handleSearchByMovie: (movie: string) => void
  handleGoToPageClick: (n: number) => void
  handleSearchByName: (name: string) => void
  updateCharactersPerPage: (n: number) => void
  handleShowCharacterDetails: (character: DisneyCharacter) => void
}

export default function CharactersTable({
  data,
  info,
  searchValue,
  movieSearchValue,
  currentPageIndex,
  charactersPerPage,
  handleSearchByName,
  handleGoToPageClick,
  handleSearchByMovie,
  updateCharactersPerPage,
  handleShowCharacterDetails,
}: TableDataProps) {
  return (
    <>
      <HeaderOptions
        info={info}
        searchValue={searchValue}
        movieSearchValue={movieSearchValue}
        handleSearchByMovie={handleSearchByMovie}
        currentPageIndex={currentPageIndex}
        charactersPerPage={charactersPerPage}
        handleSearchByName={handleSearchByName}
        handleGoToPageClick={handleGoToPageClick}
        updateCharactersPerPage={updateCharactersPerPage}
      />
      <TableContent
        characters={data}
        handleShowCharacterDetails={handleShowCharacterDetails}
      />
    </>
  )
}
