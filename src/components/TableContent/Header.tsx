import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material"

interface HeaderProps {
  orderDirection: "asc" | "desc"
  orderBy: string
  handleOnSort: (property: string) => void
}

function Header({ orderDirection, orderBy, handleOnSort }: HeaderProps) {
  // TableSortLabel requires a curried function that passes first a property to filter
  // by and then the mouse event.
  // Here event is omitted because it is not needed
  const sortHandler = (property: string) => () => {
    handleOnSort(property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            key="name"
            active={orderBy === "name"}
            direction={orderDirection}
            onClick={sortHandler("name")}
          >
            Name
          </TableSortLabel>
        </TableCell>
        <TableCell key="tvShows">TV shows</TableCell>
        <TableCell key="videoGames">Video Games</TableCell>
        <TableCell key="allies">Allies</TableCell>
        <TableCell key="enemies">Enemies</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default Header
