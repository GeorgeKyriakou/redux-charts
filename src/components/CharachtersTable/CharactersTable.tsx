import {
  type ApiInfo,
  type DisneyCharacter,
} from "../../utils/types/DisneyCharsApiResponse"
import { HeaderOptions } from "../HeaderOptions/HeaderOptions"
import TableContent from "../TableContent/Table"

interface TableDataProps {
  info: ApiInfo
  data: DisneyCharacter[]
  searchValue: string
  charactersPerPage: number
  currentPageIndex: number
  handleGoToPageClick: (n: number) => void
  handleSearchByName: (name: string) => void
  updateCharactersPerPage: (n: number) => void
  handleShowCharacterDetails: (character: DisneyCharacter) => void
}

export default function CharactersTable({
  data,
  info,
  searchValue,
  currentPageIndex,
  charactersPerPage,
  handleSearchByName,
  handleGoToPageClick,
  updateCharactersPerPage,
  handleShowCharacterDetails,
}: TableDataProps) {
  return (
    <>
      <HeaderOptions
        info={info}
        charactersPerPage={charactersPerPage}
        searchValue={searchValue}
        handleSearchByName={handleSearchByName}
        currentPageIndex={currentPageIndex}
        updateCharactersPerPage={updateCharactersPerPage}
        handleGoToPageClick={handleGoToPageClick}
      />
      <TableContent
        characters={data}
        handleShowCharacterDetails={handleShowCharacterDetails}
      />
    </>
  )
}
