import { useRef } from "react"
import styles from "./CharacterDetailsModal.module.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useDetectClick } from "../../utils/hooks/useDetectClick"
import { toggleCharacterDetailsModal } from "../../utils/reducers/uiStateSlice"

export function CharacterModal() {
  const dispatch = useAppDispatch()
  const isModalOpen = useAppSelector(
    state => state.uiState.isCharacterDetailsModalOpen,
  )
  const characterDetails = useAppSelector(
    state => state.uiState.selectedCharacter,
  )
  const modalRef = useRef<HTMLDivElement>(null)
  const onClose = () => dispatch(toggleCharacterDetailsModal())
  useDetectClick(modalRef, onClose)

  if (!isModalOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.title}>{characterDetails.name}</h2>
        <p className={styles.id}>Character ID: {characterDetails._id}</p>
        <div className={styles.imageContainer}>
          <img
            src={characterDetails.imageUrl}
            alt={characterDetails.name}
            width={200}
            height={200}
            className={styles.image}
          />
        </div>
        <div className={styles.infoSection}>
          <h3>Films:</h3>
          <ul>
            {characterDetails.films.map((film, index) => (
              <li key={index} className={styles.badge}>
                {film}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoSection}>
          <h3>TV Shows:</h3>
          <ul>
            {characterDetails.tvShows.map((show, index) => (
              <li key={index} className={styles.badge}>
                {show}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoSection}>
          <h3>Video Games:</h3>
          <ul>
            {characterDetails.videoGames.map((game, index) => (
              <li key={index} className={styles.badge}>
                {game}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.infoSection}>
          <h3>Source:</h3>
          <a
            href={characterDetails.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Disney Wiki
          </a>
        </div>
      </div>
    </div>
  )
}
