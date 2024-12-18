import { useState } from "react"
import Header from "./Header"
import { Table, TableCell, TableContainer, TableRow } from "@mui/material"
import { type DisneyCharacter } from "@/utils/types/DisneyCharsApiResponse"

const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = (order: "asc" | "desc", orderBy: string) => {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy)
}

const sortedCharacters = (
  rowArray: DisneyCharacter[],
  comparator: (a: any, b: any) => number,
): DisneyCharacter[] => {
  const stabilizedRowArray = rowArray.map((el, index) => [el, index])
  stabilizedRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return (a[1] as number) - (b[1] as number)
  })
  return stabilizedRowArray.map(el => el[0]) as DisneyCharacter[]
}

interface TableContentProps {
  characters: DisneyCharacter[]
  handleShowCharacterDetails: (character: DisneyCharacter) => void
}

function TableContent({
  characters,
  handleShowCharacterDetails,
}: TableContentProps) {
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc")
  const [orderBy, setOrderBy] = useState("")

  const handleOnSort = (property: string) => {
    const isAsc = orderBy === property && orderDirection === "asc"
    setOrderBy(property)
    setOrderDirection(isAsc ? "desc" : "asc")
  }

  if (!characters) {
    return null
  }

  return (
    <>
      <TableContainer>
        <Table>
          <Header
            orderDirection={orderDirection}
            orderBy={orderBy}
            handleOnSort={handleOnSort}
          />
          {sortedCharacters(
            characters,
            getComparator(orderDirection, orderBy),
          ).map(character => {
            return (
              <TableRow
                key={character._id}
                style={{ cursor: "pointer" }}
                onClick={() => handleShowCharacterDetails(character)}
              >
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.tvShows.length}</TableCell>
                <TableCell>{character.videoGames.length}</TableCell>
                <TableCell>{character.allies.length}</TableCell>
                <TableCell>{character.enemies.length}</TableCell>
              </TableRow>
            )
          })}
        </Table>
      </TableContainer>
    </>
  )
}

export default TableContent
