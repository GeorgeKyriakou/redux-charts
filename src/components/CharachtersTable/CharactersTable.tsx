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
import HeaderOptions from "../HeaderOptions/HeaderOptions"

interface TableDataProps {
  info: ApiInfo
  data: DisneyCharacter[]
  searchValue: string
  charactersPerPage: number
  currentPageIndex: number
  handleSearchByName: (name: string) => void
  handleShowCharacterDetails: (id: number) => void
  handleGoToPageClick: (n: number) => void
  updateCharactersPerPage: (n: number) => void
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
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <HeaderOptions
        info={info}
        charactersPerPage={charactersPerPage}
        searchValue={searchValue}
        handleSearchByName={handleSearchByName}
        currentPageIndex={currentPageIndex}
        updatecharactersPerPage={updateCharactersPerPage}
        handleGoToPageClick={handleGoToPageClick}
      />
      <Sheet>
        <Table
          sx={{
            display: "table",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: "2%" }}>#</th>
              <th style={{ width: "30%" }}>Name</th>
              <th style={{ width: "10%" }}>TV shows</th>
              <th style={{ width: "10%" }}>Video Games</th>
              <th style={{ width: "19%" }}>Allies</th>
              <th style={{ width: "19%" }}>Enemies</th>
            </tr>
          </thead>
          <tbody>
            {data.map((character, i) => {
              if (character.allies.length !== 0) {
                console.log(character)
              }
              return (
                <tr
                  style={{
                    cursor: "pointer",
                    ...(i % 2 === 0 && { backgroundColor: "#f5e1cc" }),
                  }}
                  key={character._id}
                  onClick={() => handleShowCharacterDetails(character._id)}
                >
                  <td>{i + 1}</td>
                  <td>{character.name}</td>
                  <td>{character.tvShows.length}</td>
                  <td>{character.videoGames.length}</td>
                  <td>{character.allies.join(", ")}</td>
                  <td>{character.enemies.join(", ")}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Sheet>
    </CssVarsProvider>
  )
}
