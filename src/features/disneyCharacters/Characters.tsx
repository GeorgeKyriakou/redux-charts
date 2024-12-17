import { useEffect, useMemo, useState } from "react"
import styles from "./Characters.module.css"
import { useGetDisneyCharactersQuery } from "./disneyCharactersApiSlice"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { selectCharacter } from "../../utils/reducers/uiStateSlice"
import { useAppDispatch } from "../../app/hooks"
import CharactersTable from "../../components/CharachtersTable/CharactersTable"
import { type DisneyCharacter } from "../../utils/types/DisneyCharsApiResponse"
import { ChevronUp } from "lucide-react"

export const DisneyCharacters = () => {
  const dispatch = useAppDispatch()
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false)
  const [charactersPerPage, updateCharactersPerPage] = useState(50)
  const [currentPageIndex, updateCurrentPageIndex] = useState(1)
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const { data, isError, isLoading, isSuccess } = useGetDisneyCharactersQuery({
    index: currentPageIndex,
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

  const handleShowCharacterDetails = (characterId: number) => {
    dispatch(selectCharacter(characterId))
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
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
            onClick={scrollToTop}
            className={styles.scrollToTopBtn}
            aria-label="Scroll to top"
          >
            <ChevronUp />
          </button>
        )}
        <CharactersTable
          info={data.info}
          data={filteredCharacters}
          searchValue={searchValue}
          currentPageIndex={currentPageIndex}
          updateCharactersPerPage={updateCharactersPerPage}
          handleGoToPageClick={updateCurrentPageIndex}
          charactersPerPage={charactersPerPage}
          handleSearchByName={setSearchValue}
          handleShowCharacterDetails={handleShowCharacterDetails}
        />
      </div>
    )
  }

  return null
}
