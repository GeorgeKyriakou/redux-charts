import React from "react"
import styles from "./HeaderOptions.module.css"
import { type ApiInfo } from "../../utils/types/DisneyCharsApiResponse"

const ITEMS_PER_PAGE = [10, 20, 50, 100, 200, 500]

interface HeaderOptionsProps {
  info: ApiInfo
  searchValue: string
  currentPageIndex: number
  charactersPerPage: number
  handleGoToPageClick: (n: number) => void
  handleSearchByName: (name: string) => void
  updatecharactersPerPage: (n: number) => void
}

function HeaderOptions({
  info,
  searchValue,
  currentPageIndex,
  charactersPerPage,
  handleGoToPageClick,
  handleSearchByName,
  updatecharactersPerPage,
}: HeaderOptionsProps) {
  return (
    <div className={styles.headerOptionsContainer}>
      <div>
        <label htmlFor="charactersPerPage">Characters per page</label>
        <select
          id="charactersPerPage"
          onChange={e => updatecharactersPerPage(Number(e.target.value))}
          value={charactersPerPage}
        >
          {ITEMS_PER_PAGE.map(option => (
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
          {currentPageIndex !== info.totalPages && (
            <>
              <li style={{ cursor: "default" }}>...</li>
              <li onClick={() => handleGoToPageClick(info.totalPages)}>
                {info.totalPages}
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Seach by name"
          value={searchValue}
          onChange={e => handleSearchByName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default HeaderOptions
