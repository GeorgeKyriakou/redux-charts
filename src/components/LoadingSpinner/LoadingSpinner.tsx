import styles from "./LoadingSpinner.module.css"

export const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.ldsCircle}>
        <div></div>
      </div>
    </div>
  )
}
