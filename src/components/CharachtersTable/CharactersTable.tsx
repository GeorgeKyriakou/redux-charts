import * as React from "react"
import { CssVarsProvider } from "@mui/joy/styles"
import CssBaseline from "@mui/joy/CssBaseline"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Link from "@mui/joy/Link"
import Typography from "@mui/joy/Typography"

import Table from "@mui/joy/Table"
import { Sheet } from "@mui/joy"
import {
  type ApiInfo,
  type DisneyCharacter,
} from "../../utils/types/DisneyCharsApiResponse"
import { HeaderOptions } from "../HeaderOptions/HeaderOptions"
import CharactersMUITable from "../MuiTable/Table"

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
      <CharactersMUITable
        characters={data}
        handleShowCharacterDetails={handleShowCharacterDetails}
      />
    </>
  )
}
