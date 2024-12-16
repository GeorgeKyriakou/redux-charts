import { useState } from "react"
import styles from "./Characters.module.css"
import { useGetDisneyCharactersQuery } from "./disneyCharactersApiSlice"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"
import { selectCharacter } from "../../utils/reducers/uiStateSlice"
import { type DisneyCharacter } from "../../utils/types/DisneyCharsApiResponse"
import { useAppDispatch } from "../../app/hooks"

const options = [10, 20, 50, 100, 200, 500]

export const DisneyCharacters = () => {
  const dispatch = useAppDispatch()
  const [numberOfCharacters, updateNumberOfCharacters] = useState(50)
  const [currentPageIndex, updateCurrentPageIndex] = useState(1)

  const handleCharacterClick = (character: DisneyCharacter) => {
    dispatch(selectCharacter(character))
  }

  const handleGoToPageClick = (index: number) => {
    updateCurrentPageIndex(index)
  }
  const { data, isError, isLoading, isSuccess } = useGetDisneyCharactersQuery({
    index: currentPageIndex,
    pageSize: numberOfCharacters,
  })

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
        <div>
          <label htmlFor="charactersPerPage">Characters per page</label>
          <select
            id="charactersPerPage"
            onChange={e => updateNumberOfCharacters(Number(e.target.value))}
            value={numberOfCharacters}
          >
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="charactersPerPage">Page</label>
          <ul id="pageNumber" className={styles.pagination}>
            {currentPageIndex > 3 && (
              <>
                <li onClick={() => handleGoToPageClick(1)}>1</li>
                <li style={{ cursor: "default" }}>...</li>
              </>
            )}
            {currentPageIndex - 1 > 0 && (
              <li onClick={() => handleGoToPageClick(currentPageIndex - 1)}>
                {currentPageIndex - 1}
              </li>
            )}
            <li
              onClick={() => handleGoToPageClick(currentPageIndex)}
              className={styles.current}
            >
              {currentPageIndex}
            </li>
            <li onClick={() => handleGoToPageClick(currentPageIndex + 1)}>
              {currentPageIndex + 1}
            </li>
            {currentPageIndex !== data.info.totalPages && (
              <>
                <li style={{ cursor: "default" }}>...</li>
                <li onClick={() => handleGoToPageClick(data.info.totalPages)}>
                  {data.info.totalPages}
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          {data.data.map(character => (
            <div
              key={character._id}
              className={styles.character}
              onClick={() => handleCharacterClick(character)}
            >
              <img src={character.imageUrl} alt={character.name} />
              <h2>{character.name}</h2>
              <a href={character.sourceUrl} target="_blank" rel="noreferrer">
                Source
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
