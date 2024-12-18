import { useEffect, useMemo, useState } from "react"
import clsx from "clsx"
import styles from "./Characters.module.css"
import { useGetDisneyCharactersQuery } from "./disneyCharactersApiSlice"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import {
  selectCharacter,
  setPagination,
  toggleCharacterDetailsModal,
  toggleStatisticsModal,
} from "../../utils/reducers/uiStateSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CharactersTable from "../../components/CharachtersTable/CharactersTable"
import { type DisneyCharacter } from "../../utils/types/DisneyCharsApiResponse"
import { ChevronUp, ChartPie } from "lucide-react"

export const DisneyCharacters = () => {
  const dispatch = useAppDispatch()
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
  const [searchValue, setSearchValue] = useState<string>("")

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsBackToTopVisible(true)
      } else {
        setIsBackToTopVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const { charactersPerPage, currentPage } = useAppSelector(
    state => state.uiState.pagination,
  )
  const { data, isError, isLoading, isSuccess } = useGetDisneyCharactersQuery({
    index: currentPage,
    pageSize: charactersPerPage,
  })

  const filteredCharacters = useMemo<DisneyCharacter[]>(
    () =>
      data === undefined
        ? ([] as DisneyCharacter[])
        : searchValue === ""
          ? data?.data
          : data?.data.filter(character =>
              character.name.toLowerCase().includes(searchValue.toLowerCase()),
            ),
    [data, searchValue],
  )

  const handleChangeCharactersPerPage = (n: number) => {
    dispatch(setPagination({ charactersPerPage: n }))
  }

  const handleChangePageIndex = (n: number) => {
    dispatch(setPagination({ currentPage: n }))
  }

  const handleShowCharacterDetails = (character: DisneyCharacter) => {
    dispatch(selectCharacter(character))
    dispatch(toggleCharacterDetailsModal())
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error fetching from the api</h1>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isSuccess) {
    return (
      <div>
        {isBackToTopVisible && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={clsx(styles.miscBtn, styles.scrollToTopBtn)}
            aria-label="Scroll to top"
          >
            <ChevronUp />
          </button>
        )}
        <button
          onClick={() => dispatch(toggleStatisticsModal())}
          className={clsx(styles.miscBtn, styles.statisticsModalBtn)}
          aria-label="Open character statistics modal"
        >
          <ChartPie />
        </button>
        <CharactersTable
          info={data.info}
          data={filteredCharacters}
          searchValue={searchValue}
          currentPageIndex={currentPage}
          updateCharactersPerPage={handleChangeCharactersPerPage}
          charactersPerPage={charactersPerPage}
          handleGoToPageClick={handleChangePageIndex}
          handleSearchByName={setSearchValue}
          handleShowCharacterDetails={handleShowCharacterDetails}
        />
      </div>
    )
  }

  return null
}
