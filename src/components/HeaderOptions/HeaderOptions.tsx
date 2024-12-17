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
  updateCharactersPerPage: (n: number) => void
}

export function HeaderOptions({
  charactersPerPage,
  updateCharactersPerPage,
  currentPageIndex,
  handleGoToPageClick,
  info,
  searchValue,
  handleSearchByName,
}: HeaderOptionsProps) {
  return (
    <header className={styles.modernHeader}>
      <div className={styles.headerContent}>
        <div className={styles.selectContainer}>
          <label htmlFor="charactersPerPage">Characters per page</label>
          <select
            id="charactersPerPage"
            onChange={e => updateCharactersPerPage(Number(e.target.value))}
            value={charactersPerPage}
          >
            {ITEMS_PER_PAGE.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <nav className={styles.pagination} aria-label="Pagination">
          <button
            onClick={() => handleGoToPageClick(1)}
            disabled={currentPageIndex === 1}
            aria-label="Go to first page"
          >
            &#171;
          </button>
          <button
            onClick={() => handleGoToPageClick(currentPageIndex - 1)}
            disabled={currentPageIndex === 1}
            aria-label="Go to previous page"
          >
            &#8249;
          </button>
          <span className={styles.currentPage}>
            Page {currentPageIndex} of {info.totalPages}
          </span>
          <button
            onClick={() => handleGoToPageClick(currentPageIndex + 1)}
            disabled={currentPageIndex === info.totalPages}
            aria-label="Go to next page"
          >
            &#8250;
          </button>
          <button
            onClick={() => handleGoToPageClick(info.totalPages)}
            disabled={currentPageIndex === info.totalPages}
            aria-label="Go to last page"
          >
            &#187;
          </button>
        </nav>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchValue}
            onChange={e => handleSearchByName(e.target.value)}
          />
        </div>
      </div>
    </header>
  )
}
